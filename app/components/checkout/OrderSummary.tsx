'use client';

import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function OrderSummary() {
  const { items, getTotal } = useCartStore();
  const subtotal = getTotal();
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm sticky top-24"
    >
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="relative w-20 h-20 bg-gray-100 rounded flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{item.name}</h3>
              <p className="text-xs text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
              <p className="font-semibold mt-1">{formatPrice(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </motion.div>
  );
}
