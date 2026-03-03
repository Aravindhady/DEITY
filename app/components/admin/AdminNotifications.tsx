'use client';

import { useState, useEffect, useRef } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    stock: number;
}

export default function AdminNotifications() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [readIds, setReadIds] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load dismissed notifications from localStorage
        const saved = localStorage.getItem('deity-notifications-read');
        if (saved) {
            setReadIds(JSON.parse(saved));
        }

        // Fetch products
        const fetchLowStock = async () => {
            try {
                const res = await fetch('/api/admin/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products for notifications', error);
            }
        };
        fetchLowStock();
    }, []);

    // Sync back to local storage
    useEffect(() => {
        localStorage.setItem('deity-notifications-read', JSON.stringify(readIds));
    }, [readIds]);

    // Handle clicking outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter low stock and prune any read IDs that might have gotten stock replenished
    const lowStockThreshold = 10;

    useEffect(() => {
        const currentLowStockIds = products
            .filter((p) => p.stock < lowStockThreshold)
            .map((p) => p._id);

        // If a product ID in `readIds` is no longer low stock, remove it from `readIds`
        const updatedReads = readIds.filter(id => currentLowStockIds.includes(id));

        if (updatedReads.length !== readIds.length) {
            setReadIds(updatedReads);
        }
    }, [products]);

    const activeNotifications = products.filter(
        (p) => p.stock < lowStockThreshold && !readIds.includes(p._id)
    );

    const handleMarkAsRead = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setReadIds((prev) => [...prev, id]);
    };

    const hasUnread = activeNotifications.length > 0;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full focus:outline-none transition-colors"
            >
                <FiBell size={24} />
                {hasUnread && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                        {activeNotifications.length}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                    >
                        <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Notifications</span>
                            {hasUnread && (
                                <button
                                    onClick={() => setReadIds((prev) => [...prev, ...activeNotifications.map(p => p._id)])}
                                    className="text-xs text-deity-green hover:underline focus:outline-none"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="max-h-[300px] overflow-y-auto">
                            {activeNotifications.length === 0 ? (
                                <div className="px-4 py-6 text-sm text-gray-500 text-center">
                                    You have no new notifications.
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-100">
                                    {activeNotifications.map((product) => (
                                        <li key={product._id}>
                                            <Link
                                                href={`/admin/products/${product._id}`}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            Low Stock: {product.name}
                                                        </p>
                                                        <p className="text-sm text-red-600 mt-0.5 font-semibold">
                                                            Only {product.stock} left in stock
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => handleMarkAsRead(e, product._id)}
                                                        className="flex-shrink-0 p-1 text-gray-400 hover:text-deity-green hover:bg-green-50 rounded-full focus:outline-none transition-colors"
                                                        title="Mark as read"
                                                    >
                                                        <FiCheck size={16} />
                                                    </button>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
