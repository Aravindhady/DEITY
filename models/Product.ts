import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
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
  reviews: Array<{
    userId: mongoose.Types.ObjectId;
    userName: string;
    rating: number;
    title?: string;
    comment: string;
    verified: boolean;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    images: [{ type: String }],
    category: { type: String, enum: ['mens', 'womens', 'accessories', 'unisex'], required: true },
    subcategory: { type: String },
    collections: [{ type: String }],
    sizes: [
      {
        size: String,
        stock: { type: Number, default: 0 },
      },
    ],
    colors: [
      {
        name: String,
        hex: String,
        images: [String],
      },
    ],
    tags: [{ type: String }],
    isNewArrival: { type: Boolean, default: false },
    isLimitedEdition: { type: Boolean, default: false },
    isExclusive: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    sku: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userName: String,
        rating: { type: Number, required: true, min: 1, max: 5 },
        title: String,
        comment: { type: String, required: true },
        verified: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
