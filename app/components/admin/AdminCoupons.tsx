'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiEdit, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getCachedData, setCachedData, removeCachedItem } from '@/lib/cache';

interface Coupon {
  _id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description?: string;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  usedCount: number;
  usageLimit?: number;
  usagePercentage?: number;
  isExpired?: boolean;
  isActiveNow?: boolean;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 10,
    description: '',
    minPurchase: undefined as number | undefined,
    maxDiscount: undefined as number | undefined,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    usageLimit: undefined as number | undefined,
    isActive: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    // Try to get cached data first
    const cachedCoupons = getCachedData<Coupon[]>('coupons');
    
    if (cachedCoupons) {
      console.log('Loading coupons from cache');
      setCoupons(cachedCoupons);
      setLoading(false);
      return;
    }

    console.log('Fetching coupons from API...');
    try {
      const response = await fetch('/api/admin/coupons');
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
        // Cache the data
        setCachedData('coupons', data);
      } else if (response.status === 401 || response.status === 403) {
        // Redirect to login if unauthorized
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const response = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Coupon deleted successfully');
        fetchCoupons();
      }
    } catch (error) {
      toast.error('Error deleting coupon');
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      description: coupon.description || '',
      minPurchase: coupon.minPurchase,
      maxDiscount: coupon.maxDiscount,
      validFrom: new Date(coupon.validFrom).toISOString().split('T')[0],
      validUntil: new Date(coupon.validUntil).toISOString().split('T')[0],
      usageLimit: coupon.usageLimit,
      isActive: coupon.isActive,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCoupon 
        ? `/api/admin/coupons/${editingCoupon._id}` 
        : '/api/admin/coupons';
      
      const method = editingCoupon ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(editingCoupon ? 'Coupon updated!' : 'Coupon created!');
        // Clear cache and refetch
        removeCachedItem('coupons');
        setShowForm(false);
        setEditingCoupon(null);
        resetForm();
        fetchCoupons();
      } else {
        toast.error(data.error || 'Failed to save coupon');
      }
    } catch (error) {
      toast.error('Error saving coupon');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      type: 'percentage',
      value: 10,
      description: '',
      minPurchase: undefined,
      maxDiscount: undefined,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usageLimit: undefined,
      isActive: true,
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading coupons...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Coupons</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-deity-green text-white px-6 py-2 rounded hover:bg-opacity-90 flex items-center gap-2"
        >
          <FiPlus />
          Add Coupon
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingCoupon(null);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  placeholder="SUMMER25"
                  required
                  disabled={!!editingCoupon}
                />
                <p className="text-xs text-gray-500 mt-1">Auto-converted to uppercase</p>
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  required
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (₹)</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Value *
                </label>
                <input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  min="0"
                  max={formData.type === 'percentage' ? 100 : undefined}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.type === 'percentage' ? 'Enter percentage (0-100)' : 'Enter amount in rupees'}
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  placeholder="Summer sale discount"
                />
              </div>

              {/* Minimum Purchase */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Purchase Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.minPurchase || ''}
                  onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  min="0"
                  placeholder="1000"
                />
                <p className="text-xs text-gray-500 mt-1">Order must be above this amount to use coupon</p>
              </div>

              {/* Maximum Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Discount (₹)
                </label>
                <input
                  type="number"
                  value={formData.maxDiscount || ''}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  min="0"
                  placeholder="500"
                />
                <p className="text-xs text-gray-500 mt-1">Only for percentage discounts</p>
              </div>

              {/* Valid From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid From *
                </label>
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  required
                />
              </div>

              {/* Valid Until */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until *
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  min={formData.validFrom}
                  required
                />
              </div>

              {/* Usage Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Usage Limit
                </label>
                <input
                  type="number"
                  value={formData.usageLimit || ''}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-deity-green focus:border-transparent"
                  min="1"
                  placeholder="100"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited</p>
              </div>

              {/* Active Status */}
              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-deity-green border-gray-300 rounded focus:ring-deity-green"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active Coupon
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-deity-green text-white px-8 py-3 rounded hover:bg-opacity-90 font-medium"
              >
                {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCoupon(null);
                  resetForm();
                }}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Purchase</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {coupons.map((coupon, index) => (
                <motion.tr
                  key={coupon._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-mono font-semibold text-deity-green">{coupon.code}</td>
                  <td className="px-6 py-4 capitalize">
                    <span className={`px-2 py-1 rounded text-xs ${coupon.type === 'percentage' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {coupon.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                    {coupon.maxDiscount && coupon.type === 'percentage' && (
                      <div className="text-xs text-gray-500">Max: ₹{coupon.maxDiscount}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {coupon.minPurchase ? `₹${coupon.minPurchase}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>{new Date(coupon.validFrom).toLocaleDateString()}</div>
                    <div className="text-gray-500">to</div>
                    <div>{new Date(coupon.validUntil).toLocaleDateString()}</div>
                    {coupon.isExpired && (
                      <div className="text-xs text-red-600 mt-1">Expired</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="text-xs text-gray-600 mb-1">
                          {coupon.usedCount} / {coupon.usageLimit || '∞'}
                        </div>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-deity-green rounded-full" 
                            style={{ width: `${coupon.usagePercentage || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {coupon.description && (
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">
                        {coupon.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          !coupon.isActiveNow || coupon.isExpired
                            ? 'bg-gray-100 text-gray-600'
                            : coupon.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {!coupon.isActiveNow || coupon.isExpired ? 'Inactive' : coupon.isActive ? 'Active' : 'Scheduled'}
                      </span>
                      {coupon.isActive && !coupon.isActiveNow && (
                        <span className="text-xs text-gray-500">
                          Starts: {new Date(coupon.validFrom).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit coupon"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete coupon"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {coupons.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No coupons yet. Create your first coupon!
          </div>
        )}
      </div>
    </div>
  );
}
