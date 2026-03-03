'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/app/components/Loading';
import PaymentSection from './PaymentSection';

interface CheckoutFormData {
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutForm() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress: data,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();
      setOrderId(order._id);

      toast.success('Order created successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return <PaymentSection orderId={orderId} />;
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-sm space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

      <div>
        <label className="block text-sm font-semibold mb-2">Email *</label>
        <input
          {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Phone *</label>
        <input
          {...register('phone', { required: 'Phone is required' })}
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Street Address *</label>
        <input
          {...register('street', { required: 'Street address is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
        />
        {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">City *</label>
          <input
            {...register('city', { required: 'City is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">State *</label>
          <input
            {...register('state', { required: 'State is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Zip Code *</label>
          <input
            {...register('zipCode', { required: 'Zip code is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Country *</label>
          <input
            {...register('country', { required: 'Country is required' })}
            defaultValue="United States"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-deity-green text-white py-4 font-semibold rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Continue to Payment'}
      </motion.button>
    </motion.form>
  );
}
