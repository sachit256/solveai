import Razorpay from 'razorpay';
import { supabase } from '../src/lib/supabase';

const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID!,
  key_secret: process.env.VITE_RAZORPAY_KEY_SECRET!
});

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { amount, planId, userId } = body;
    
    if (!amount || typeof amount !== 'number') {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        planId,
        userId
      }
    });

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}