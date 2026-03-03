'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function CollectionPage({ category, products }: { category: string; products: any[] }) {
  const categoryTitle = category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          {categoryTitle}
        </motion.h1>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
        )}
      </div>
    </div>
  );
}
