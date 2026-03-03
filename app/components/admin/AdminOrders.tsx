'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiExternalLink } from 'react-icons/fi';
import { getCachedData, setCachedData, removeCachedItem } from '@/lib/cache';
import toast from 'react-hot-toast';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  userId: { name: string; email: string };
}

const statusConfig = {
  pending: { icon: FiClock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  processing: { icon: FiPackage, color: 'text-blue-600', bg: 'bg-blue-50' },
  shipped: { icon: FiTruck, color: 'text-purple-600', bg: 'bg-purple-50' },
  delivered: { icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  cancelled: { icon: FiClock, color: 'text-red-600', bg: 'bg-red-50' },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    // Try to get cached data first
    const cachedOrders = getCachedData<Order[]>('orders');
    
    if (cachedOrders) {
      console.log('Loading orders from cache');
      setOrders(cachedOrders);
      setLoading(false);
      return;
    }

    console.log('Fetching orders from API...');
    try {
      const response = await fetch('/api/admin/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        // Cache the data
        setCachedData('orders', data);
      } else if (response.status === 401 || response.status === 403) {
        // Redirect to login if unauthorized
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success('Order updated successfully');
        // Clear cache and refetch
        removeCachedItem('orders');
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
        <Link
          href="/profile"
          className="flex items-center gap-2 text-deity-green hover:text-deity-green/80 transition-colors font-medium"
        >
          <span>View All Orders</span>
          <FiExternalLink size={18} />
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || FiClock;
                const statusColor = statusConfig[order.status as keyof typeof statusConfig]?.color || 'text-gray-600';
                const statusBg = statusConfig[order.status as keyof typeof statusConfig]?.bg || 'bg-gray-50';

                return (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-semibold">#{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{order.userId?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{order.userId?.email || ''}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className={`px-3 py-1 rounded text-sm font-semibold border ${statusBg} ${statusColor}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
