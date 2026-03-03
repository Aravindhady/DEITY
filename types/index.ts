export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  addresses: Array<{
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: 'mens' | 'womens' | 'accessories' | 'unisex';
  subcategory?: string;
  collections: string[];
  sizes: Array<{
    size: string;
    stock: number;
  }>;
  colors: Array<{
    name: string;
    hex: string;
    images?: string[];
  }>;
  tags: string[];
  isNewArrival: boolean;
  isLimitedEdition: boolean;
  isExclusive: boolean;
  isBestSeller: boolean;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
}

export interface Order {
  _id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}
