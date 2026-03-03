import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    comment: { type: String, required: true },
    images: [{ type: String }],
    verified: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
