'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Package, Heart, LogOut } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      try {
        // Check if user is logged in via API
        const response = await fetch('/api/auth/me');
        
        if (!response.ok) {
          // Not logged in, redirect to login
          router.push('/login');
          return;
        }

        const data = await response.json();
        const userData = data.user;
        
        if (!userData) {
          router.push('/login');
          return;
        }

        // Set user data
        setUser({
          name: userData.name || userData.email,
          email: userData.email
        });

        // IMMEDIATE redirect based on role - don't set state, just redirect
        if (userData.role === 'admin') {
          console.log('Admin detected, redirecting to /admin');
          router.push('/admin');
        } else {
          console.log('Regular user detected, staying on profile');
          // Regular user - stop redirecting and show profile
          setIsRedirecting(false);
        }
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      }
    };

    checkUserAndRedirect();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('deity-user');
    router.push('/');
  };

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-white pt-[101px] flex items-center justify-center">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] py-8 md:py-12 px-4 md:px-6">
      {!user ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase">My Account</h1>
              <p className="text-sm md:text-base text-gray-600 mt-2">Welcome back, {user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm md:text-base font-semibold"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              Logout
            </button>
          </div>

          {/* Account Info Card */}
          <div className="bg-gray-50 p-4 md:p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-deity-green text-white flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-xl font-semibold">{user.name}</h2>
                <p className="text-sm md:text-base text-gray-600 mt-1 break-all">{user.email}</p>
                <Link
                  href="/profile/edit"
                  className="inline-block mt-3 md:mt-4 text-sm md:text-base text-deity-green hover:underline font-semibold"
                >
                  Edit Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Orders */}
            <Link
              href="/profile/orders"
              className="group border border-gray-200 p-6 md:p-8 hover:border-black transition-colors"
            >
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-deity-green transition-colors">
                  <Package className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold uppercase">Orders</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">View order history</p>
                </div>
              </div>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="group border border-gray-200 p-6 md:p-8 hover:border-black transition-colors"
            >
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-deity-green transition-colors">
                  <Heart className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold uppercase">Wishlist</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Saved items</p>
                </div>
              </div>
            </Link>

            {/* Account Settings */}
            <Link
              href="/profile/edit"
              className="group border border-gray-200 p-6 md:p-8 hover:border-black transition-colors"
            >
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-deity-green transition-colors">
                  <User className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold uppercase">Settings</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">Edit account details</p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
      )}
    </div>
  );
}
