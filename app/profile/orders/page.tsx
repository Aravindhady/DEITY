'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';

interface Order {
    id: string;
    date: string;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
    items: number;
}

const mockOrders: Order[] = [
    {
        id: 'ORD-2024-001',
        date: '2024-02-10',
        status: 'Delivered',
        total: 4498,
        items: 2,
    },
    {
        id: 'ORD-2024-002',
        date: '2024-02-08',
        status: 'Shipped',
        total: 2999,
        items: 1,
    },
    {
        id: 'ORD-2024-003',
        date: '2024-02-05',
        status: 'Processing',
        total: 5997,
        items: 3,
    },
];

export default function OrdersPage() {
    const router = useRouter();
    const [orders] = useState<Order[]>(mockOrders);

    useEffect(() => {
        const userData = localStorage.getItem('deity-user');
        if (!userData) {
            router.push('/login');
        }
    }, [router]);

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Delivered':
                return 'text-green-600 bg-green-50';
            case 'Shipped':
                return 'text-blue-600 bg-blue-50';
            case 'Processing':
                return 'text-yellow-600 bg-yellow-50';
            case 'Cancelled':
                return 'text-red-600 bg-red-50';
        }
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
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase">Order History</h1>
                        <p className="text-sm md:text-base text-gray-600 mt-2">View and track your orders</p>
                    </div>

                    {/* Orders List */}
                    {orders.length === 0 ? (
                        <div className="text-center py-12 md:py-16 border border-gray-200">
                            <Package className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-base md:text-lg text-gray-500 mb-4">No orders yet</p>
                            <button
                                onClick={() => router.push('/collections')}
                                className="bg-black text-white px-6 md:px-8 py-3 md:py-4 font-semibold uppercase hover:bg-deity-green transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 md:space-y-6">
                            {orders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="border border-gray-200 p-4 md:p-6 hover:border-black transition-colors group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Order Info */}
                                        <div className="space-y-2 md:space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                                <h3 className="text-base md:text-lg font-semibold">{order.id}</h3>
                                                <span
                                                    className={`inline-block px-3 py-1 rounded text-xs md:text-sm font-semibold uppercase w-fit ${getStatusColor(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-gray-600">
                                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                                <p>Items: {order.items}</p>
                                                <p className="font-semibold text-black">Total: ₹{order.total.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {/* View Details Button */}
                                        <button className="flex items-center gap-2 text-sm md:text-base font-semibold text-black group-hover:text-deity-green transition-colors w-fit">
                                            View Details
                                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
