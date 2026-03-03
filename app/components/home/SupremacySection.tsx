'use client';

import { motion } from 'framer-motion';

export function SupremacySection() {
    return (
        <section className="w-full bg-deity-dark overflow-hidden relative min-h-[800px] py-12 lg:py-[150px] px-4 lg:px-[108px]">
            {/* Asterisk Decoration - Top Right */}
            <motion.div
                initial={{ opacity: 0, rotate: -45 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1 }}
                className="absolute right-0 lg:right-[100px] top-[100px] pointer-events-none"
            >
                <span className="font-joti text-deity-green text-[clamp(150px,20vw,400px)] leading-none">
                    *
                </span>
            </motion.div>

            {/* Asterisk Decoration - Bottom Right */}
            <motion.div
                initial={{ opacity: 0, rotate: 45 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute right-0 lg:right-[50px] bottom-[150px] lg:bottom-[100px] pointer-events-none"
            >
                <span className="font-joti text-white text-[clamp(100px,15vw,300px)] leading-none">
                    *
                </span>
            </motion.div>

            {/* Supremacy Content */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-[600px]"
            >
                <h3 className="text-white text-5xl lg:text-6xl font-semibold mb-8">Supremacy</h3>
                <p className="text-white text-xl lg:text-2xl leading-relaxed mb-12">
                    Deity is not just about the product — it's about the experience. The luxury, the elegance,
                    and the unmistakable Deity look you embody while wearing it are truly unmatchable.
                </p>
            </motion.div>

            {/* Since 2024 - Stacked Numbers */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute right-4 lg:right-[150px] bottom-[50px] lg:bottom-[100px] z-10"
            >
                <div className="relative flex flex-col items-end">
                    <span className="text-white font-black text-[clamp(80px,12vw,160px)] leading-none">
                        20
                    </span>
                    <span className="text-white font-black text-[clamp(80px,12vw,160px)] leading-none -mt-4 lg:-mt-8">
                        24
                    </span>
                </div>
            </motion.div>
        </section>
    );
}

export default SupremacySection;
