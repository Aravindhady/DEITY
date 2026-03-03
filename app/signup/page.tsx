'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!formData.acceptTerms) {
            toast.error('Please accept terms and conditions');
            return;
        }

        // Mock signup - in production, this would call an API
        localStorage.setItem('deity-user', JSON.stringify({
            email: formData.email,
            name: formData.name,
        }));

        toast.success('Account created successfully!');
        router.push('/profile');
    };

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] py-8 md:py-12 px-4 md:px-6">
            <div className="w-full max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 md:space-y-8"
                >
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-black uppercase mb-2 md:mb-4">Sign Up</h1>
                        <p className="text-sm md:text-base text-gray-600">
                            Join the DEITY family
                        </p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold mb-2 uppercase">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 px-4 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:border-black transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold mb-2 uppercase">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 px-4 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:border-black transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold mb-2 uppercase">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border border-gray-300 px-4 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:border-black transition-colors"
                                placeholder="Minimum 6 characters"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold mb-2 uppercase">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full border border-gray-300 px-4 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:border-black transition-colors"
                                placeholder="Re-enter password"
                            />
                        </div>

                        {/* Terms & Conditions */}
                        <div>
                            <label className="flex items-start gap-2 md:gap-3 cursor-pointer text-sm md:text-base">
                                <input
                                    type="checkbox"
                                    required
                                    checked={formData.acceptTerms}
                                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                    className="w-4 h-4 md:w-5 md:h-5 mt-1"
                                />
                                <span>
                                    I agree to the{' '}
                                    <Link href="/terms-of-service" className="text-deity-green hover:underline">
                                        Terms & Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy-policy" className="text-deity-green hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 md:py-4 font-semibold uppercase hover:bg-deity-green transition-colors"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">OR</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm md:text-base text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-black hover:text-deity-green transition-colors">
                                Login
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
