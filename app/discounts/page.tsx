'use client';

import { motion } from 'framer-motion';
import { Ticket, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface Coupon {
    code: string;
    discount: string;
    description: string;
    expiresAt: string;
    minPurchase?: string;
}

const coupons: Coupon[] = [
    {
        code: 'DEITY10',
        discount: '10% OFF',
        description: 'Get 10% off on all products',
        expiresAt: '2024-03-31',
    },
    {
        code: 'WELCOME20',
        discount: '20% OFF',
        description: 'First time purchase discount',
        expiresAt: '2024-04-30',
        minPurchase: '₹2999',
    },
    {
        code: 'FREESHIP',
        discount: 'FREE SHIPPING',
        description: 'Free shipping on all orders',
        expiresAt: '2024-12-31',
    },
    {
        code: 'DEITY500',
        discount: '₹500 OFF',
        description: 'Flat ₹500 off on orders above ₹5000',
        expiresAt: '2024-06-30',
        minPurchase: '₹5000',
    },
];

export default function DiscountsPage() {
    const copyCoupon = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`Coupon code "${code}" copied!`);
    };

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] py-8 md:py-12 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 md:space-y-8"
                >
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-3 md:mb-4">
                            Exclusive Discounts
                        </h1>
                        <p className="text-sm md:text-base lg:text-lg text-gray-600">
                            Save big with our special discount codes
                        </p>
                    </div>

                    {/* Coupons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {coupons.map((coupon, index) => (
                            <motion.div
                                key={coupon.code}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border-2 border-dashed border-gray-300 p-4 md:p-6 hover:border-deity-green transition-colors group"
                            >
                                <div className="flex items-start gap-3 md:gap-4 mb-4">
                                    <Ticket className="w-8 h-8 md:w-10 md:h-10 text-deity-green flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg md:text-xl font-bold text-deity-green mb-1">
                                            {coupon.discount}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            {coupon.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Coupon Code */}
                                <div className="bg-gray-50 border border-gray-200 p-3 md:p-4 mb-3 md:mb-4 flex items-center justify-between">
                                    <code className="text-base md:text-lg font-bold uppercase tracking-wider">
                                        {coupon.code}
                                    </code>
                                    <button
                                        onClick={() => copyCoupon(coupon.code)}
                                        className="text-deity-green hover:text-black transition-colors"
                                    >
                                        <Copy className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>

                                {/* Details */}
                                <div className="space-y-1 text-xs md:text-sm text-gray-500">
                                    {coupon.minPurchase && (
                                        <p>• Min. purchase: {coupon.minPurchase}</p>
                                    )}
                                    <p>• Valid until: {new Date(coupon.expiresAt).toLocaleDateString()}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Terms & Conditions */}
                    <div className="border-t border-gray-200 pt-6 md:pt-8">
                        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 uppercase">
                            Terms & Conditions
                        </h2>
                        <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                            <li>• Coupon codes are valid for one-time use only</li>
                            <li>• Cannot be combined with other offers</li>
                            <li>• Applicable on select products only</li>
                            <li>• Subject to availability and terms</li>
                            <li>• DEITY reserves the right to modify or cancel offers</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
