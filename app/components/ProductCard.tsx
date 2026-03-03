'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const displayPrice = product.salePrice || product.price;
    const hasDiscount = product.salePrice && product.salePrice < product.price;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <Link href={`/products/${product.id}`}>
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gray-100 mb-3 md:mb-4 overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Sale Badge */}
                    {hasDiscount && (
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-deity-green text-white text-xs md:text-sm font-semibold px-2 md:px-3 py-1 uppercase">
                            Sale
                        </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <span className="text-black font-semibold text-sm md:text-base uppercase">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-1 md:space-y-2">
                    <h3 className="font-semibold text-sm md:text-base group-hover:text-deity-green transition-colors line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2">
                        <span className="text-black font-bold text-sm md:text-base">
                            ₹{displayPrice.toLocaleString()}
                        </span>
                        {hasDiscount && (
                            <span className="text-gray-400 text-xs md:text-sm line-through">
                                ₹{product.price.toLocaleString()}
                            </span>
                        )}
                    </div>

                    <p className="text-xs md:text-sm text-gray-500">{product.category}</p>
                </div>
            </Link>
        </motion.div>
    );
}
