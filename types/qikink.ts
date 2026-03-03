// types/qikink.ts

// Base response types
export interface QikinkBaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface QikinkPaginatedResponse<T> extends QikinkBaseResponse {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Product-related types
export interface QikinkProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  collections: string[];
  variants: QikinkProductVariant[];
  tags: string[];
  inventory: number;
  sku: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface QikinkProductVariant {
  id: string;
  productId: string;
  name: string;
  price: number;
  inventory: number;
  attributes: Record<string, string>;
  sku: string;
}

// Order-related types
export interface QikinkOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  items: QikinkOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: QikinkAddress;
  billingAddress: QikinkAddress;
  createdAt: string;
  updatedAt: string;
}

export interface QikinkOrderItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface QikinkAddress {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

// Customer-related types
export interface QikinkCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: QikinkAddress[];
  createdAt: string;
  updatedAt: string;
}

// Inventory-related types
export interface QikinkInventory {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  reserved: number;
  available: number;
  updatedAt: string;
}

// Coupon/Discount types
export interface QikinkCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  minimumAmount?: number;
  maximumAmount?: number;
  usageLimit?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API request/response types
export interface QikinkCreateOrderRequest {
  customerId?: string;
  email: string;
  items: {
    productId: string;
    variantId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: QikinkAddress;
  billingAddress?: QikinkAddress;
  couponCode?: string;
  metadata?: Record<string, any>;
}

export interface QikinkCreateOrderResponse extends QikinkBaseResponse {
  data: QikinkOrder;
}

export interface QikinkGetProductResponse extends QikinkBaseResponse {
  data: QikinkProduct;
}

export interface QikinkGetProductsResponse extends QikinkPaginatedResponse<QikinkProduct> {}

export interface QikinkGetOrderResponse extends QikinkBaseResponse {
  data: QikinkOrder;
}

export interface QikinkGetCustomerResponse extends QikinkBaseResponse {
  data: QikinkCustomer;
}

export interface QikinkCreateCustomerRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses?: QikinkAddress[];
}

export interface QikinkCreateCustomerResponse extends QikinkBaseResponse {
  data: QikinkCustomer;
}