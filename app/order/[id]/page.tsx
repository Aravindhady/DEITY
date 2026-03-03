'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
    const params = useParams();
    const orderId = params.id as string;

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center py-8 md:py-12"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-block"
                >
                    <CheckCircle className="w-16 h-16 md:w-24 md:h-24 text-green-500 mx-auto mb-6 md:mb-8" />
                </motion.div>

                {/* Message */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 md:mb-6">
                    Order Confirmed!
                </h1>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>

                {/* Order Details */}
                <div className="bg-gray-50 border border-gray-200 p-6 md:p-8 mb-6 md:mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
                        <Package className="w-6 h-6 text-deity-green" />
                        <h2 className="text-lg md:text-xl font-semibold">Order #{orderId}</h2>
                    </div>

                    <p className="text-sm md:text-base text-gray-600 mb-4">
                        A confirmation email has been sent to your email address.
                    </p>

                    <div className="space-y-2 text-sm md:text-base">
                        <p className="text-gray-600">
                            <span className="font-semibold text-black">Estimated Delivery:</span> 5-7 business days
                        </p>
                        <p className="text-gray-600">
                            You can track your order from your account.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <Link
                        href="/profile/orders"
                        className="inline-block bg-black text-white px-6 md:px-8 py-3 md:py-4 font-semibold uppercase hover:bg-deity-green transition-colors"
                    >
                        View Orders
                    </Link>
                    <Link
                        href="/collections"
                        className="inline-block border border-black text-black px-6 md:px-8 py-3 md:py-4 font-semibold uppercase hover:bg-gray-100 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
