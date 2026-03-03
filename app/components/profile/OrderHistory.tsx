'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';
import Image from 'next/image';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  trackingNumber?: string;
  createdAt: string;
}

const statusConfig = {
  pending: { icon: FiClock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  processing: { icon: FiPackage, color: 'text-blue-600', bg: 'bg-blue-50' },
  shipped: { icon: FiTruck, color: 'text-purple-600', bg: 'bg-purple-50' },
  delivered: { icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { icon: FiClock, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <p className="text-gray-600 mb-4">No orders yet</p>
        <Link
          href="/collections"
          className="text-deity-green hover:underline font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order, index) => {
        const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || FiClock;
        const statusColor = statusConfig[order.status as keyof typeof statusConfig]?.color || 'text-gray-600';
        const statusBg = statusConfig[order.status as keyof typeof statusConfig]?.bg || 'bg-gray-50';

        return (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold">Order #{order.orderNumber}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full ${statusBg} flex items-center gap-2`}>
                <StatusIcon className={statusColor} />
                <span className={`font-semibold ${statusColor}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                    <Image
                      src={item.image || '/images/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {order.trackingNumber && (
              <div className="mb-4 p-3 bg-gray-50 rounded">
                <p className="text-sm">
                  <span className="font-semibold">Tracking:</span> {order.trackingNumber}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-bold">{formatPrice(order.total)}</span>
              <Link
                href={`/profile/orders/${order._id}`}
                className="text-deity-green hover:underline font-semibold"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
