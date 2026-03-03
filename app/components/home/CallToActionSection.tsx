'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CallToActionSection() {
  return (
    <section className="relative bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left - Divine Masculine */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Link href="/collections/mens" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/divine-masculine.jpg"
                    alt="Divine Masculine"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">DIVINE MASCULINE</h3>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                >
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Center - Large Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-deity-green leading-tight">
              BE THE<br />
              GOOD<br />
              YOU SEEK
            </h2>
          </motion.div>

          {/* Right - Divine Feminine */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Link href="/collections/womens" className="group block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/divine-feminine.jpg"
                    alt="Divine Feminine"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">DIVINE FEMININE</h3>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                >
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}