'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { getCachedData, setCachedData } from '@/lib/cache';

interface Stats {
  revenue: {
    total: number;
    cost: number;
    profit: number;
    margin: string;
  };
  orders: {
    total: number;
    paid: number;
    pending: number;
  };
  products: {
    total: number;
    lowStock: number;
  };
  users: {
    total: number;
  };
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Try to get cached data first
      const cachedStats = getCachedData<Stats>('stats');
      
      if (cachedStats) {
        console.log('Loading stats from cache');
        setStats(cachedStats);
        setLoading(false);
        return;
      }

      console.log('Fetching stats from API...');
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
          // Cache the data
          setCachedData('stats', data);
        } else if (response.status === 401 || response.status === 403) {
          // Redirect to login if unauthorized
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading statistics...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12">Failed to load statistics</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const statCards = [
    // ... (stat cards definition omitted to save space, but we are keeping it as is)
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.revenue.total),
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Profit',
      value: formatCurrency(stats.revenue.profit),
      icon: FiTrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      subtitle: `Margin: ${stats.revenue.margin}%`,
    },
    {
      title: 'Total Orders',
      value: stats.orders.total.toString(),
      icon: FiShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      subtitle: `${stats.orders.paid} paid`,
    },
    {
      title: 'Total Products',
      value: stats.products.total.toString(),
      icon: FiPackage,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      subtitle: `${stats.products.lowStock} low stock`,
    },
    {
      title: 'Total Users',
      value: stats.users.total.toString(),
      icon: FiUsers,
      color: 'text-deity-green',
      bgColor: 'bg-deity-green/10',
    },
  ];

  const downloadSalesReport = () => {
    // Basic CSV headers
    const csvRows = [
      ['Metric', 'Value'],
      ['Total Revenue', formatCurrency(stats.revenue.total)],
      ['Total Cost', formatCurrency(stats.revenue.cost)],
      ['Total Profit', formatCurrency(stats.revenue.profit)],
      ['Profit Margin', `${stats.revenue.margin}%`],
      ['Total Orders', stats.orders.total],
      ['Paid Orders', stats.orders.paid],
      ['Pending Orders', stats.orders.pending],
      ['Total Products', stats.products.total],
      ['Low Stock Products', stats.products.lowStock],
      ['Total Users', stats.users.total],
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-deity-green mb-1">{card.value}</p>
              {card.subtitle && <p className="text-sm text-gray-500">{card.subtitle}</p>}
            </motion.div>
          );
        })}
      </div>

      {/* Profit/Loss Chart Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Revenue Breakdown</h2>
          <button
            onClick={downloadSalesReport}
            className="bg-deity-green text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition-colors"
          >
            Download Sales Report (CSV)
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Revenue</span>
              <span className="text-sm font-bold text-green-600">
                {formatCurrency(stats.revenue.total)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Cost</span>
              <span className="text-sm font-bold text-red-600">
                {formatCurrency(stats.revenue.cost)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${(stats.revenue.cost / stats.revenue.total) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Profit</span>
              <span className="text-sm font-bold text-blue-600">
                {formatCurrency(stats.revenue.profit)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(stats.revenue.profit / stats.revenue.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
