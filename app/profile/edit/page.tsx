'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        const userData = localStorage.getItem('deity-user');
        if (!userData) {
            router.push('/login');
            return;
        }
        const user = JSON.parse(userData);
        setFormData(prev => ({
            ...prev,
            name: user.name,
            email: user.email,
            phone: user.phone || '',
        }));
    }, [router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        // Update user data
        localStorage.setItem('deity-user', JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        }));

        toast.success('Profile updated successfully!');
        router.push('/profile');
    };

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] py-8 md:py-12 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 md:space-y-8"
                >
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase">Edit Profile</h1>
                        <p className="text-sm md:text-base text-gray-600 mt-2">Update your account information</p>
                    </div>

                    {/* Edit Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        {/* Personal Information */}
                        <div className="border border-gray-200 p-4 md:p-6 space-y-4 md:space-y-5">
                            <h2 className="text-lg md:text-xl font-semibold uppercase">Personal Information</h2>

                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                                    placeholder="+91 1234567890"
                                />
                            </div>
                        </div>

                        {/* Change Password */}
                        <div className="border border-gray-200 p-4 md:p-6 space-y-4 md:space-y-5">
                            <h2 className="text-lg md:text-xl font-semibold uppercase">Change Password</h2>
                            <p className="text-xs md:text-sm text-gray-600">Leave blank if you don't want to change your password</p>

                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-black text-white py-3 md:py-4 font-semibold uppercase hover:bg-deity-g reen transition-colors"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 border border-black text-black py-3 md:py-4 font-semibold uppercase hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
