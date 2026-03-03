'use client';

import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] flex items-center justify-center px-4">
                <div className="text-center py-12 md:py-16 max-w-md">
                    <ShoppingBag className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4 md:mb-6" />
                    <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Your Cart is Empty</h1>
                    <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                        href="/collections"
                        className="inline-block bg-black text-white px-6 md:px-8 py-3 md:py-4 font-semibold uppercase hover:bg-deity-green transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] py-8 md:py-12 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 md:space-y-8"
                >
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase">Shopping Cart</h1>
                        <p className="text-sm md:text-base text-gray-600 mt-2">{cartCount} items in your cart</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={`${item.id}-${item.size}`}
                                    className="flex gap-4 border border-gray-200 p-4 md:p-6"
                                >
                                    {/* Product Image */}
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 flex flex-col justify-between min-w-0">
                                        <div>
                                            <h3 className="font-semibold text-sm md:text-base lg:text-lg mb-1 md:mb-2">
                                                {item.name}
                                            </h3>
                                            {item.size && (
                                                <p className="text-xs md:text-sm text-gray-500">Size: {item.size}</p>
                                            )}
                                            <p className="text-sm md:text-base lg:text-lg font-bold mt-2">
                                                ₹{item.price.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 mt-3 md:mt-0">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-semibold text-sm md:text-base">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 md:w-10 md:h-10 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove & Subtotal */}
                                    <div className="flex flex-col items-end justify-between">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-5 h-5 md:w-6 md:h-6" />
                                        </button>
                                        <p className="text-base md:text-lg font-bold">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="border border-gray-200 p-4 md:p-6 sticky top-[90px] md:top-[105px] lg:top-[121px] space-y-4 md:space-y-6">
                                <h2 className="text-lg md:text-xl font-semibold uppercase">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm md:text-base">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm md:text-base">
                                        <span>Shipping</span>
                                        <span className="text-deity-green font-semibold">FREE</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-base md:text-lg font-bold">
                                            <span>Total</span>
                                            <span>₹{cartTotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="block w-full bg-black text-white py-3 md:py-4 text-center font-semibold uppercase hover:bg-deity-green transition-colors"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link
                                    href="/collections"
                                    className="block w-full border border-black text-black py-3 md:py-4 text-center font-semibold uppercase hover:bg-gray-100 transition-colors"
                                >
                                    Continue Shopping
                                </Link>

                                <p className="text-xs text-gray-500 text-center">
                                    Taxes calculated at checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
