'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getCachedData, setCachedData, removeCachedItem } from '@/lib/cache';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Try to get cached data first
    const cachedProducts = getCachedData<Product[]>('products');
    
    if (cachedProducts) {
      console.log('Loading products from cache');
      setProducts(cachedProducts);
      setLoading(false);
      return;
    }

    console.log('Fetching products from API...');
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        // Cache the data
        setCachedData('products', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Product deleted successfully');
        // Clear cache and refetch
        removeCachedItem('products');
        fetchProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          href="/admin/products/new"
          className="bg-deity-green text-white px-6 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
        >
          <FiPlus />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                        <Image
                          src={product.images[0] || '/images/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span className="font-semibold">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{product.category}</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-sm ${product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        prefetch={false}
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
