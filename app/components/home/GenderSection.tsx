'use client';

import { motion } from 'framer-motion';

export function GenderSection() {
    return (
        <section className="w-full min-h-screen bg-white py-8 md:py-12 lg:py-[100px] px-4 md:px-6 lg:px-[50px] relative overflow-hidden">
            {/* Large Background Text */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <motion.h2
                    initial={{ x: '-10%' }}
                    whileInView={{ x: '10%' }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="text-[clamp(60px,12vw,200px)] font-black leading-none uppercase text-black/5 whitespace-nowrap"
                >
                    BE THE GOD YOU SEEK BE THE GOD YOU SEEK
                </motion.h2>
            </div>

            {/* Photo Frames Grid */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 max-w-[1400px] mx-auto">
                {/* Frame 1 - Top Left */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="col-span-1 mt-0 lg:mt-[50px]"
                >
                    <div className="bg-white p-2 md:p-3 shadow-lg">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/4c9e1a91c49c0e83a785f78df7e5d0f2b62d0bba?width=646"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </div>
                </motion.div>

                {/* Frame 2 - Center Large */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="col-span-2 md:col-span-1 lg:mt-[100px]"
                >
                    <div className="bg-white p-2 md:p-3 shadow-lg">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/b66a7f7e86d98cd39e8fb5e83912fd9f5f4e2224?width=646"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </div>
                </motion.div>

                {/* Frame 3 - Small Top Right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="col-span-1 mt-0 hidden md:block"
                >
                    <div className="bg-white p-2 shadow-lg">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/845d9ec6dc8ed7ce7c26d679e7bcff838fe9568c?width=400"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </div>
                </motion.div>

                {/* Frame 4 - Bottom Left */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="col-span-1 mt-[-30px] md:mt-[-50px] lg:mt-0"
                >
                    <div className="bg-white p-2 shadow-lg">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/fbe47e47ab8fa99ec02b41a905515ed69259b5e7?width=400"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </div>
                </motion.div>

                {/* Frame 5 - Bottom Right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="col-span-1 mt-[-20px] md:mt-[-30px] lg:mt-[50px]"
                >
                    <div className="bg-white p-2 md:p-3 shadow-lg">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/99c728a7feeca223329fb263b764503ac040bad8?width=646"
                            alt="Deity Product"
                            className="w-full aspect-[3/4] object-cover"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Text */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10 mt-8 md:mt-12 lg:mt-[100px] text-center"
            >
                <h3 className="text-black font-black text-[clamp(32px,6vw,120px)] leading-none uppercase">
                    BE THE
                    <br />
                    GOD YOU SEEK
                </h3>
            </motion.div>
        </section>
    );
}

export default GenderSection;
