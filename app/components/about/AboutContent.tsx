'use client';

import { motion } from 'framer-motion';

export default function AboutContent() {
  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg leading-relaxed"
        >
          Founded in 2024, Deity symbolizes refined elegance and quiet strength. We believe in
          creating pieces that speak for themselves—timeless designs that transcend trends and
          embody sophistication. Our commitment to minimal perfection means every detail is
          intentional, every stitch purposeful. Deity is not about being seen; it&apos;s about
          being remembered, softly yet completely. We define style rather than follow fashion,
          crafting garments that become part of your identity. When you wear Deity, you wear
          confidence, grace, and an unspoken aura of distinction.
        </motion.p>
      </div>
    </section>
  );
}
