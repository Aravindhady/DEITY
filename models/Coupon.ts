import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description?: string;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  usedBy?: {
    userId: mongoose.Types.ObjectId;
    userEmail: string;
    orderId: mongoose.Types.ObjectId;
    orderAmount: number;
    discountAmount: number;
    usedAt: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true },
    description: { type: String },
    minPurchase: { type: Number },
    maxDiscount: { type: Number },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 },
    usedBy: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        userEmail: String,
        orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
        orderAmount: Number,
        discountAmount: Number,
        usedAt: { type: Date, default: Date.now }
      }
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
