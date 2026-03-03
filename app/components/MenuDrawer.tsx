'use client';

import { useMenu } from './MenuContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';

export default function MenuDrawer() {
  const { isOpen, closeMenu } = useMenu();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Divine Masculine', href: '/collections/mens', category: 'mens' },
    { name: 'Divine Feminine', href: '/collections/womens', category: 'womens' },
    { name: 'Accessories', href: '/collections/accessories', category: 'accessories' },
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'Limited Editions', href: '/collections/limited-editions' },
    { name: 'Acid Wash Hoodies', href: '/collections/acid-wash-hoodies' },
    { name: 'Deity Exclusive', href: '/collections/deity-exclusive' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 shadow-xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="text-black hover:text-gray-600 transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>
              <nav className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="block text-lg text-black hover:text-deity-green transition-colors py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
