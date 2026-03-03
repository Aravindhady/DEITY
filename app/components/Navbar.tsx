'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const { openCart, cartCount } = useCart();
  const [hidden, setHidden] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="w-full bg-white border-b border-gray-200 fixed top-0 z-50 shadow-sm"
      >
        <div className="flex items-center justify-between h-[70px] md:h-[85px] lg:h-[101px] px-4 md:px-6 lg:px-[108px]">
          {/* Left: Contact Us - Hidden on mobile */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact" className="text-black text-lg lg:text-xl font-normal hover:opacity-70 transition-opacity">
              + Contact Us
            </Link>
          </div>

          {/* Mobile: Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-black hover:opacity-70 transition-opacity"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ce8c81733e0b44e1212bc869b27316bbf45f4529?width=428"
                alt="Deity"
                className="h-[24px] md:h-[28px] lg:h-[30px] w-auto"
              />
            </Link>
          </div>

          {/* Right: Icons and Menu */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
            {/* Account Icon */}
            <Link href="/profile" className="text-black hover:opacity-70 transition-opacity">
              <User className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </Link>

            {/* Shopping Bag Icon with Badge */}
            <button
              onClick={openCart}
              className="text-black hover:opacity-70 transition-opacity relative"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-deity-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Search Icon - Hidden on small mobile */}
            <button className="hidden sm:block text-black hover:opacity-70 transition-opacity">
              <Search className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
            </button>

            {/* Desktop Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="hidden lg:flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Menu className="w-[30px] h-[30px]" strokeWidth={1.5} />
              <span className="text-black text-xl font-normal">Menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] lg:z-[100]"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-[110] shadow-xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/ce8c81733e0b44e1212bc869b27316bbf45f4529?width=428"
                    alt="Deity"
                    className="h-[24px] w-auto"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-black hover:opacity-70"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-4">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                >
                  Home
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                >
                  Shop All
                </Link>
                <Link
                  href="/collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                >
                  Collections
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                >
                  Contact Us
                </Link>
                <Link
                  href="/discounts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                >
                  Discounts
                </Link>

                {/* User Section */}
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                  >
                    <User className="w-5 h-5" strokeWidth={1.5} />
                    <span>My Account</span>
                  </Link>
                  <Link
                    href="/profile/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-black text-lg font-semibold hover:text-deity-green transition-colors py-2"
                  >
                    <Package className="w-5 h-5" strokeWidth={1.5} />
                    <span>Orders</span>
                  </Link>
                </div>

                {/* Search on Mobile */}
                <div className="pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-black text-lg font-semibold hover:text-deity-green transition-colors py-2">
                    <Search className="w-5 h-5" strokeWidth={1.5} />
                    <span>Search</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
