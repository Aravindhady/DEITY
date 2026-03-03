'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 404 && data.error === 'User not found, please sign up') {
                    toast.error(data.error);
                    router.push('/signup');
                    return;
                }
                throw new Error(data.error || 'Login failed');
            }

            // Save basic user info for UI (token is handled by HTTP-only cookie)
            localStorage.setItem('deity-user', JSON.stringify({
                email: data.user.email,
                name: data.user.name,
                role: data.user.role,
            }));

            toast.success('Logged in successfully!');
            router.push('/profile');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] flex items-center justify-center px-4 md:px-6">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 md:space-y-8"
                >
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-black uppercase mb-2 md:mb-4">Login</h1>
                        <p className="text-sm md:text-base text-gray-600">
                            Welcome back to DEITY
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border border-gray-300 px-4 py-3 md:py-4 text-sm md:text-base focus:outline-none focus:border-black transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm md:text-base">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                    className="w-4 h-4 md:w-5 md:h-5"
                                />
                                <span>Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-deity-green hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-black text-white py-3 md:py-4 font-semibold uppercase transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-deity-green'
                                }`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
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

                    {/* Signup Link */}
                    <div className="text-center">
                        <p className="text-sm md:text-base text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-semibold text-black hover:text-deity-green transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
