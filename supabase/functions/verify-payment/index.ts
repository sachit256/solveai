import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders, handleCors, addCorsHeaders } from '../shared/cors.ts';

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, planId, userId } = await req.json();

    // Validate all required parameters
    const requiredParams = { razorpay_payment_id, razorpay_order_id, razorpay_signature, planId, userId };
    const missingParams = Object.entries(requiredParams)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingParams.length > 0) {
      throw new Error(`Missing required parameters: ${missingParams.join(', ')}`);
    }

    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const razorpaySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!supabaseUrl || !supabaseKey || !razorpaySecret) {
      throw new Error('Missing required environment variables');
    }

    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const digest = await createHmacSha256(razorpaySecret, text);

    if (digest !== razorpay_signature) {
      throw new Error('Invalid payment signature');
    }

    // Create Supabase client
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Check for existing subscription
    const { data: existingSubscription, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .select()
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    let error;
    if (existingSubscription) {
      // Update existing subscription
      const { error: updateError } = await supabaseClient
        .from('subscriptions')
        .update({
          plan_id: planId,
          payment_id: razorpay_payment_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSubscription.id);
      error = updateError;
    } else {
      // Create new subscription
      const { error: insertError } = await supabaseClient
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          payment_id: razorpay_payment_id
        });
      error = insertError;
    }

    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }

    return addCorsHeaders(
      new Response(
        JSON.stringify({ 
          success: true,
          message: 'Payment verified and subscription activated'
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({ 
          success: false,
          error: error instanceof Error ? error.message : 'Payment verification failed',
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    );
  }
});

async function createHmacSha256(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // Convert to hex string
}