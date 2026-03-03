'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LoadingSpinner } from '@/app/components/Loading';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileInfo() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      // Update profile API call
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-lg shadow-sm max-w-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <div>
        <label className="block text-sm font-semibold mb-2">Full Name *</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

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
        <label className="block text-sm font-semibold mb-2">Phone</label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-deity-green"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="bg-deity-green text-white px-8 py-3 font-semibold rounded hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
      </motion.button>
    </motion.form>
  );
}
