'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function ProductRecommendations({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={product.images[0] || '/images/placeholder.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-deity-green transition-colors">
              {product.name}
            </h3>
            <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
