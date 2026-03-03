'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    number: '/1',
    title: 'LIMITED EDITIONS',
    description: 'LIMITED IN NUMBER, UNMATCHED IN DETAIL THESE EXCLUSIVE CREATIONS ARE RESERVED FOR THOSE WHO MOVE DIFFERENTLY.',
    href: '/collections/limited-editions',
  },
  {
    number: '/2',
    title: 'ACID WASH HOODIES',
    description: 'OUR ACID-WASH HOODIES BLEND VINTAGE ATTITUDE WITH MODERN CRAFTSMANSHIP NO TWO PIECES ARE EVER THE SAME.',
    href: '/collections/acid-wash-hoodies',
  },
  {
    number: '/3',
    title: 'DEITY EXCLUSIVE',
    description: 'CRAFTED FOR THOSE WHO RISE ABOVE, DEITY EXCLUSIVE PIECES DEFINE LUXURY STREETWEAR AT IT\'S FINEST.',
    href: '/collections/deity-exclusive',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-gray-600">
            EXPLORE OUR MOST-COVETED PIECES — TIMELESS DESIGNS THAT CONTINUE TO DEFINE ELEVATED STYLE.
            HANDPICKED BY DISCERNING CUSTOMERS, THESE BEST SELLERS REPRESENT THE FINEST OF OUR CRAFT.
          </p>
        </motion.div>

        <div className="space-y-0 border-t border-b divide-y">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 items-center"
            >
              <div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-2xl font-bold text-gray-400">{category.number}</span>
                  <h2 className="text-4xl md:text-5xl font-bold">{category.title}</h2>
                </div>
              </div>
              <div>
                <p className="text-gray-700 mb-6 leading-relaxed">{category.description}</p>
                <Link
                  href={category.href}
                  className="text-deity-green font-semibold hover:underline inline-flex items-center gap-2"
                >
                  EXPLORE MORE{' >'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
