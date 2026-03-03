'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const product = getProductById(params.productId as string);

    if (!product) {
        return (
            <div className="min-h-screen bg-white pt-[101px] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">Product Not Found</h1>
                    <button
                        onClick={() => router.push('/collections')}
                        className="bg-black text-white px-6 py-3 hover:bg-deity-green transition-colors"
                    >
                        Back to Collections
                    </button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (product.sizes.length > 0 && !selectedSize) {
            toast.error('Please select a size');
            return;
        }

        addToCart(
            {
                id: product.id,
                name: product.name,
                price: product.salePrice || product.price,
                image: product.images[0],
                size: selectedSize,
            },
            quantity
        );

        toast.success('Added to cart!');
    };

    const displayPrice = product.salePrice || product.price;
    const hasDiscount = product.salePrice && product.salePrice < product.price;

    return (
        <div className="min-h-screen bg-white pt-[70px] md:pt-[85px] lg:pt-[101px]">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="aspect-[3/4] bg-gray-100"
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2 md:gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square bg-gray-100 ${selectedImage === index ? 'ring-2 ring-black' : ''
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 md:space-y-8">
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3 mb-4 md:mb-6">
                                <span className="text-2xl md:text-3xl font-bold">
                                    ₹{displayPrice.toLocaleString()}
                                </span>
                                {hasDiscount && (
                                    <span className="text-lg md:text-xl text-gray-400 line-through">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Size Selector */}
                        {product.sizes.length > 0 && (
                            <div>
                                <label className="block text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase">
                                    Select Size
                                </label>
                                <div className="grid grid-cols-5 gap-2 md:gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-2 md:py-3 text-sm md:text-base font-semibold border transition-colors ${selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div>
                            <label className="block text-sm md:text-base font-semibold mb-3 md:mb-4 uppercase">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                                >
                                    <Minus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <span className="text-lg md:text-xl font-semibold w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 md:w-12 md:h-12 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                                >
                                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="space-y-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className="w-full bg-black text-white py-4 md:py-5 text-sm md:text-base font-semibold uppercase flex items-center justify-center gap-2 hover:bg-deity-green transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>

                            <button className="w-full border border-black text-black py-4 md:py-5 text-sm md:text-base font-semibold uppercase flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                                <Heart className="w-5 h-5" />
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="border-t border-gray-200 pt-6 md:pt-8 space-y-4 text-sm md:text-base">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span className="font-semibold">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Availability:</span>
                                <span className={`font-semibold ${product.inStock ? 'text-deity-green' : 'text-red-500'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
