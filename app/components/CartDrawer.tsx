'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-[80]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] md:w-[450px] bg-white z-[90] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-lg md:text-xl font-semibold uppercase">Cart ({cartCount})</h2>
              </div>
              <button
                onClick={closeCart}
                className="text-black hover:opacity-70 transition-opacity"
              >
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-gray-100 pb-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm md:text-base truncate">{item.name}</h3>
                        {item.size && <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>}
                        <p className="text-sm font-semibold mt-2">₹{item.price.toLocaleString()}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors self-start"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 md:p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-semibold uppercase">Subtotal</span>
                  <span className="text-lg md:text-xl font-bold">₹{cartTotal.toLocaleString()}</span>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full bg-black text-white py-3 md:py-4 text-center font-semibold uppercase hover:bg-deity-green transition-colors"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full border border-black text-black py-3 md:py-4 text-center font-semibold uppercase hover:bg-gray-100 transition-colors"
                  >
                    View Cart
                  </Link>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
