'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export default function CollectionsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'T-Shirts', 'Hoodies', 'Sweatshirts', 'Pants'];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px]">
            {/* Hero Section */}
            <section className="bg-black text-white py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4"
                    >
                        Collections
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto"
                    >
                        Explore our carefully curated collection of premium streetwear pieces
                    </motion.p>
                </div>
            </section>

            {/* Filters */}
            <section className="border-b border-gray-200 sticky top-[70px] md:top-[85px] lg:top-[101px] bg-white z-40">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
                    <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-semibold uppercase whitespace-nowrap transition-colors ${selectedCategory === category
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-black hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 md:py-16">
                        <p className="text-gray-500 text-base md:text-lg">No products found in this category.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6 md:mb-8">
                            <p className="text-sm md:text-base text-gray-600">
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}
