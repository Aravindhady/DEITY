'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative bg-black text-white min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <div className="w-20 h-1 bg-deity-green mb-8"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about-1.jpg"
                alt="About Deity"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/about-2.jpg"
                alt="About Deity"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
