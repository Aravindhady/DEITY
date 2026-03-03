'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { FiMinus, FiPlus, FiStar, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ProductRecommendations from './ProductRecommendations';
import ProductReviews from './ProductReviews';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  sizes: Array<{ size: string; stock: number }>;
  colors: Array<{ name: string; hex: string }>;
  rating: number;
  reviewCount: number;
}

export default function ProductDetails({ product, relatedProducts }: { product: Product; relatedProducts: any[] }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
    });

    toast.success('Added to cart');
    openCart();
  };

  const selectedSizeStock = product.sizes.find((s) => s.size === selectedSize)?.stock || 0;
  const maxQuantity = Math.min(selectedSizeStock, 10);

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square bg-gray-100 mb-4">
              <Image
                src={product.images[selectedImageIndex] || product.images[0] || '/images/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 border-2 ${
                      selectedImageIndex === index ? 'border-deity-green' : 'border-gray-200'
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(product.rating)
                          ? 'fill-deity-green text-deity-green'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                {product.compareAtPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2">Color: {selectedColor}</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color.name ? 'border-deity-green ring-2 ring-deity-green' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold mb-2">Size</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => {
                        setSelectedSize(size.size);
                        setQuantity(1);
                      }}
                      disabled={size.stock === 0}
                      className={`px-6 py-2 border-2 ${
                        selectedSize === size.size
                          ? 'border-deity-green bg-deity-green text-white'
                          : 'border-gray-300 hover:border-deity-green'
                      } ${size.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {size.size} {size.stock === 0 && '(Out of Stock)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 hover:bg-gray-100"
                >
                  <FiMinus />
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                  disabled={quantity >= maxQuantity}
                  className="p-2 border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FiPlus />
                </button>
                <span className="text-sm text-gray-600">{selectedSizeStock} available</span>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={selectedSizeStock === 0}
              className="w-full bg-black text-white py-4 font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-20">
          <ProductReviews productId={product._id} />
        </div>

        {/* Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <ProductRecommendations products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
