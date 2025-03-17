import crypto from 'crypto';
import { supabase } from '../src/lib/supabase';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      planId
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !planId) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.VITE_RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Check if subscription already exists
      const { data: existingSubscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (existingSubscription) {
        // Update existing subscription
        const { error: updateError } = await supabase
          .from('subscriptions')
          .update({
            plan_id: planId,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscription.id);

        if (updateError) throw updateError;
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: userId,
            plan_id: planId,
            status: 'active'
          }
        ]);

        if (insertError) throw insertError;
      }


      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Invalid signature' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return new Response(JSON.stringify({ success: false, error: 'Payment verification failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}