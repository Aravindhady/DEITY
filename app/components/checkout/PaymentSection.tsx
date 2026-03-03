'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/app/components/Loading';
import { useCartStore } from '@/store/cartStore';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function CheckoutForm({ orderId }: { orderId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const total = getTotal() + 10 + getTotal() * 0.1;

      // Create payment intent
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, orderId }),
      });

      const { clientSecret } = await response.json();

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        toast.error(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        clearCart();
        toast.success('Payment successful!');
        router.push(`/profile/orders`);
      }
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <div className="p-4 border border-gray-300 rounded">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-deity-green text-white py-4 font-semibold rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Pay Now'}
      </motion.button>
    </form>
  );
}

export default function PaymentSection({ orderId }: { orderId: string }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={orderId} />
    </Elements>
  );
}
