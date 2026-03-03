'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'DEITY10') {
      setDiscount(cartTotal * 0.1);
      toast.success('Coupon applied! 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const finalTotal = cartTotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock order creation
    const orderId = 'ORD-' + Date.now();
    clearCart();
    toast.success('Order placed successfully!');
    router.push(`/order/${orderId}`);
  };

  if (cartItems.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px] py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-black uppercase mb-6 md:mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Shipping Information */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              {/* Contact */}
              <div className="border border-gray-200 p-4 md:p-6 space-y-4">
                <h2 className="text-lg md:text-xl font-semibold uppercase">Contact Information</h2>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                />
              </div>

              {/* Shipping Address */}
              <div className="border border-gray-200 p-4 md:p-6 space-y-4">
                <h2 className="text-lg md:text-xl font-semibold uppercase">Shipping Address</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    required
                    placeholder="PIN Code"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                  />
                </div>

                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 px-4 py-3 text-sm md:text-base focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-4 md:p-6 sticky top-[90px] md:top-[105px] lg:top-[121px] space-y-4 md:space-y-6">
                <h2 className="text-lg md:text-xl font-semibold uppercase">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 max-h-48 md:max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-4 bg-black text-white text-sm font-semibold hover:bg-deity-green transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-deity-green font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-base md:text-lg font-bold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 md:py-4 font-semibold uppercase hover:bg-deity-green transition-colors"
                >
                  Place Order
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By placing order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
