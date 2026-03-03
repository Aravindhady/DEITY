'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { LoadingSpinner } from '@/app/components/Loading';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // We'll check on mount

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    compareAtPrice: 0,
    category: 'mens',
    subcategory: '',
    collections: [''],
    sizes: [{ size: '', stock: 0 }],
    colors: [{ name: '', hex: '' }],
    tags: [''],
    images: [''],
    isNewArrival: false,
    isLimitedEdition: false,
    isExclusive: false,
    isBestSeller: false,
    stock: 0,
    sku: '',
  });

  // Check admin authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();

        if (data.user?.role !== 'admin') {
          router.push('/');
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin auth:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Product created successfully!');
        router.push('/admin');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('An error occurred while creating the product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' || name === 'compareAtPrice' || name === 'stock' ? Number(value) : value
      }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...(prev as any)[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const currentValue = (prev as any)[field];
      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [field]: [...currentValue, field === 'sizes' ? { size: '', stock: 0 } : field === 'colors' ? { name: '', hex: '' } : '']
        };
      }
      return prev;
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const currentValue = (prev as any)[field];
      if (Array.isArray(currentValue) && currentValue.length > 1) {
        return {
          ...prev,
          [field]: currentValue.filter((_: any, i: number) => i !== index)
        };
      }
      return prev;
    });
  };

  const handleSizeChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => {
      const newSizes = [...prev.sizes];
      (newSizes[index] as any)[field] = value;
      return {
        ...prev,
        sizes: newSizes
      };
    });
  };

  const handleColorChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newColors = [...prev.colors];
      (newColors[index] as any)[field] = value;
      return {
        ...prev,
        colors: newColors
      };
    });
  };

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        } else {
          toast.error(`Failed to upload image ${i + 1}`);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          // Filter out empty strings that were placeholders
          images: [...prev.images.filter(img => img !== ''), ...uploadedUrls],
        }));
        toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)!`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('An error occurred during upload.');
    } finally {
      setIsUploadingImage(false);
      // Reset the file input so the same files can trigger onChange again if needed
      if (e.target) e.target.value = '';
    }
  };

  if (!isAdmin) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:bg-gray-200 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LoadingSpinner size="lg" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compare At Price</label>
                  <input
                    type="number"
                    name="compareAtPrice"
                    value={formData.compareAtPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                >
                  <option value="mens">Men's</option>
                  <option value="womens">Women's</option>
                  <option value="accessories">Accessories</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                />
              </div>
            </div>

            {/* Images and Attributes */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Images & Attributes</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>

                {/* Upload Input */}
                <div className="mb-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          {isUploadingImage ? <span className="font-semibold text-deity-green">Uploading directly to Cloudinary...</span> : <span className="font-semibold">Click to upload images</span>}
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                      />
                    </label>
                  </div>
                </div>

                {/* Image Previews */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.filter(img => img).map((image, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={image}
                        alt={`Product representation ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('images', index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        title="Remove Image"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                      placeholder="Tag"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                    />
                    {formData.tags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('tags', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('tags')}
                  className="mt-1 text-sm text-deity-green hover:underline"
                >
                  + Add Tag
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collections (comma separated)</label>
                {formData.collections.map((collection, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={collection}
                      onChange={(e) => handleArrayChange('collections', index, e.target.value)}
                      placeholder="Collection"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                    />
                    {formData.collections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('collections', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('collections')}
                  className="mt-1 text-sm text-deity-green hover:underline"
                >
                  + Add Collection
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Sizes</h3>
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      placeholder="Size (e.g. S, M, L)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                    />
                    <input
                      type="number"
                      value={size.stock}
                      onChange={(e) => handleSizeChange(index, 'stock', Number(e.target.value))}
                      placeholder="Stock"
                      min="0"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                    />
                    {formData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('sizes', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('sizes')}
                  className="mt-1 text-sm text-deity-green hover:underline"
                >
                  + Add Size
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Colors</h3>
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                      placeholder="Color name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                    />
                    <input
                      type="text"
                      value={color.hex}
                      onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                      placeholder="Hex code"
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deity-green"
                    />
                    {formData.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('colors', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('colors')}
                  className="mt-1 text-sm text-deity-green hover:underline"
                >
                  + Add Color
                </button>
              </div>
            </div>
          </div>

          {/* Flags */}
          <div className="mt-6 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Product Flags</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isNewArrival"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-deity-green focus:ring-deity-green border-gray-300 rounded"
                />
                <label htmlFor="isNewArrival" className="ml-2 block text-sm text-gray-700">
                  New Arrival
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isLimitedEdition"
                  name="isLimitedEdition"
                  checked={formData.isLimitedEdition}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-deity-green focus:ring-deity-green border-gray-300 rounded"
                />
                <label htmlFor="isLimitedEdition" className="ml-2 block text-sm text-gray-700">
                  Limited Edition
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isExclusive"
                  name="isExclusive"
                  checked={formData.isExclusive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-deity-green focus:ring-deity-green border-gray-300 rounded"
                />
                <label htmlFor="isExclusive" className="ml-2 block text-sm text-gray-700">
                  Exclusive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isBestSeller"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-deity-green focus:ring-deity-green border-gray-300 rounded"
                />
                <label htmlFor="isBestSeller" className="ml-2 block text-sm text-gray-700">
                  Best Seller
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-deity-green text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}