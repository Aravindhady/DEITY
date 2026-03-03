'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell } from 'react-icons/fi';
import Link from 'next/link';

interface LowStockProduct {
  _id: string;
  name: string;
  slug: string;
  stock: number;
  sku: string;
  category: string;
  images: string[];
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin and fetch low stock products
    const checkAdminAndFetchNotifications = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Decode token to check role (you can use jwt-decode package)
        const decoded: any = JSON.parse(atob(token.split('.')[1]));
        
        if (decoded.role !== 'admin') {
          setLoading(false);
          return;
        }

        setIsAdmin(true);

        // Fetch low stock products
        const response = await fetch('/api/admin/low-stock');
        if (response.ok) {
          const data = await response.json();
          setLowStockProducts(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetchNotifications();
  }, []);

  if (!isAdmin || loading) {
    return null;
  }

  const notificationCount = lowStockProducts.length;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-deity-green transition-colors"
      >
        <FiBell size={24} />
        
        {/* Notification Badge */}
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {notificationCount > 9 ? '9+' : notificationCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-deity-green text-white px-4 py-3">
                <h3 className="font-semibold text-lg">Low Stock Alerts</h3>
                <p className="text-sm text-deity-green/80">
                  {notificationCount} product{notificationCount !== 1 ? 's' : ''} need attention
                </p>
              </div>

              {/* Content */}
              <div className="max-h-96 overflow-y-auto">
                {notificationCount === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <FiBell size={48} className="mx-auto mb-2 opacity-20" />
                    <p>No low stock products</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {lowStockProducts.map((product) => (
                      <Link
                        key={product._id}
                        href={`/admin/products/${product._id}/edit`}
                        className="block p-4 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                            {product.images[0] && (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            )}
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                product.stock < 5 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                Only {product.stock} left
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <Link
                  href="/admin/products"
                  className="text-sm text-deity-green font-medium hover:text-deity-green/80 block text-center"
                  onClick={() => setIsOpen(false)}
                >
                  View All Products →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
