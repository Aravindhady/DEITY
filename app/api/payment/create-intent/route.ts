import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { requireAuth } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    const { amount, orderId } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: user.userId,
        orderId: orderId || '',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
