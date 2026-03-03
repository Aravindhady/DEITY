'use client';

import { motion } from 'framer-motion';

export function LimitedEditionsSection() {
    const products = [
        {
            number: "/1",
            title: "LIMITED EDITIONS",
            description: "LIMITED IN NUMBER, UNMATCHED IN DETAIL. THESE EXCLUSIVE CREATIONS ARE RESERVED FOR THOSE WHO MOVE DIFFERENT IN UNITY.",
        },
        {
            number: "/2",
            title: "ACID WASH HOODIES",
            description: "OUR ACID-WASH HOODIES BLEND VINTAGE ATTITUDE WITH MODERN, LIGHTWEIGHT CRAFTSMANSHIP AND TWO PIECES ARE CUT THE SAME.",
        },
        {
            number: "/3",
            title: "DEITY EXCLUSIVE",
            description: "CRAFTED FOR THOSE WHO RISE ABOVE, DEITY EXCLUSIVE PIECES DEFINE LUXURY STREETWEAR AT ITS FINEST.",
        },
    ];

    return (
        <section className="w-full bg-white py-12 lg:py-[100px] px-4 lg:px-[87px]">
            {/* Header Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 lg:mb-[100px]"
            >
                <p className="text-black text-xs lg:text-sm font-normal uppercase tracking-wide max-w-[900px]">
                    EXPLORE OUR MOST-COVETED PIECES — TIMELESS DESIGNS THAT CONTINUE TO DEFINE ELEVATED STYLE.
                    HANDPICKED BY DISCERNING CUSTOMERS, THESE BEST SELLERS REPRESENT THE FINEST OF OUR CRAFT.
                </p>
            </motion.div>

            {/* Product Categories */}
            <div className="space-y-8 lg:space-y-12">
                {products.map((product, index) => (
                    <motion.div
                        key={product.number}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="border-t border-black pt-8 lg:pt-12"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
                            {/* Left: Number and Title */}
                            <div className="flex items-baseline gap-4 lg:gap-6 lg:w-1/2">
                                <span className="text-black text-sm font-normal">{product.number}</span>
                                <h3 className="text-black font-semibold text-3xl lg:text-[64px] lg:leading-[70px] uppercase">
                                    {product.title}
                                </h3>
                            </div>

                            {/* Right: Description and Link */}
                            <div className="lg:w-1/2 flex flex-col gap-4 lg:gap-6">
                                <p className="text-black text-xs lg:text-sm font-normal uppercase tracking-wide">
                                    {product.description}
                                </p>
                                <div className="flex justify-end">
                                    <a href="#" className="text-black text-sm lg:text-base font-semibold uppercase hover:opacity-70 transition-opacity">
                                        EXPLORE MORE&gt;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default LimitedEditionsSection;
