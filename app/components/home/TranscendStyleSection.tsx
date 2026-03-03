'use client';

import { motion } from 'framer-motion';

export function TranscendStyleSection() {
    return (
        <section className="w-full bg-black py-8 md:py-12 lg:py-[150px] px-4 md:px-6 lg:px-[50px] relative overflow-hidden">
            {/* Large Scrolling Background Text */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-10">
                <motion.h2
                    initial={{ x: '-10%' }}
                    animate={{ x: '10%' }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
                    className="text-white font-black text-[clamp(60px,12vw,300px)] leading-none uppercase whitespace-nowrap"
                >
                    TRANSCEND YOUR STYLE
                </motion.h2>
            </div>

            {/* Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 max-w-[1400px] mx-auto">
                {/* Left Column */}
                <div className="space-y-6 md:space-y-8 lg:space-y-12">
                    {/* Product Image 1 with Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-2 md:p-3 shadow-lg"
                    >
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/845d9ec6dc8ed7ce7c26d679e7bcff838fe9568c?width=646"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </motion.div>

                    {/* Text Block */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-[400px]"
                    >
                        <p className="text-white text-sm md:text-base font-light leading-relaxed">
                            Crafted for those who rise in silence.
                            <br />
                            Deity brings choices of style
                            <br />
                            and honour for you.
                        </p>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 md:space-y-8 lg:space-y-12 lg:pt-[100px]">
                    {/* Product Image 2 with Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-white p-2 md:p-3 shadow-lg"
                    >
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/fbe47e47ab8fa99ec02b41a905515ed69259b5e7?width=646"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </motion.div>

                    {/* Product Image 3 with Frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-2 md:p-3 shadow-lg"
                    >
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/99c728a7feeca223329fb263b764503ac040bad8?width=646"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-10 mt-8 md:mt-12 lg:mt-[150px] text-center lg:text-right"
            >
                <h3 className="text-white font-black text-[clamp(32px,6vw,140px)] leading-none uppercase">
                    BE THE
                    <br />
                    GOD YOU SEEK
                </h3>
            </motion.div>
        </section>
    );
}

export default TranscendStyleSection;
