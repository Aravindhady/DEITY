'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AdminStats from '@/app/components/admin/AdminStats';
import AdminProducts from '@/app/components/admin/AdminProducts';
import AdminOrders from '@/app/components/admin/AdminOrders';
import AdminCoupons from '@/app/components/admin/AdminCoupons';
import AdminNotifications from '@/app/components/admin/AdminNotifications';
import { LoadingSpinner } from '@/app/components/Loading';
import { FiPackage, FiShoppingBag, FiTag, FiBarChart2, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'coupons' | 'profile'>('stats');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();

        if (data.user?.role !== 'admin') {
          router.push('/');
          return;
        }

        setIsAdmin(true);
        setUserEmail(data.user.email || '');
        
        // Get token for display
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (token) {
          try {
            const decoded = jwtDecode<JwtPayload>(token);
            setUserEmail(decoded.email);
          } catch (e) {
            console.error('Error decoding token:', e);
          }
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/');
    }
  };

  const tabs = [
    { id: 'stats' as const, label: 'Statistics', icon: FiBarChart2 },
    { id: 'products' as const, label: 'Products', icon: FiPackage },
    { id: 'orders' as const, label: 'Orders', icon: FiShoppingBag },
    { id: 'coupons' as const, label: 'Coupons', icon: FiTag },
    { id: 'profile' as const, label: 'Profile', icon: FiUser },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700 hover:text-deity-green"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <AdminNotifications />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-30 bg-white pt-24 px-6"
          >
            <div className="space-y-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-deity-green text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                );
              })}
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                  <div className="w-10 h-10 bg-deity-green text-white rounded-full flex items-center justify-center font-bold">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Admin</p>
                    <p className="text-xs text-gray-600 truncate">{userEmail}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut size={20} />
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Admin Dashboard
          </motion.h1>
          <div className="flex items-center gap-4">
            <AdminNotifications />
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="w-10 h-10 bg-deity-green text-white rounded-full flex items-center justify-center font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-gray-600">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden lg:flex gap-2 mb-8 border-b overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-deity-green text-deity-green'
                    : 'border-transparent text-gray-600 hover:text-deity-green'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 lg:mt-0"
        >
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'coupons' && <AdminCoupons />}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
              <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-deity-green text-white rounded-full flex items-center justify-center text-3xl font-bold">
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <button className="bg-deity-green text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-sm text-gray-500 mt-2">JPG, GIF or PNG. Max size 2MB.</p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Contact support to change email</p>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="px-4 py-2 bg-green-50 text-green-800 rounded inline-flex items-center gap-2">
                    <span className="font-semibold">Administrator</span>
                  </div>
                </div>

                {/* Account Info */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <p className="text-gray-900">January 2026</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Login
                      </label>
                      <p className="text-gray-900">Today</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <button className="bg-deity-green text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors w-full sm:w-auto">
                    Save Changes
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
