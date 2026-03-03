import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { getAuthUser } from '@/lib/auth';

// GET reviews for a product
export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB();
    
    const product = await Product.findById(params.productId)
      .select('reviews rating reviewCount')
      .lean() as any;
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      reviews: product.reviews,
      rating: product.rating,
      reviewCount: product.reviewCount
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Add a new review
export async function POST(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    await connectDB();
    
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { rating, title, comment } = await request.json();
    
    if (!rating || !comment) {
      return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 });
    }
    
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }
    
    // Check if user purchased this product (verified purchase)
    const hasPurchased = await Order.findOne({
      userId: user.userId,
      'items.productId': params.productId,
      paymentStatus: 'paid'
    });
    
    const product = await Product.findById(params.productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // Add review to product
    product.reviews.push({
      userId: user.userId,
      userName: user.email,
      rating,
      title: title || '',
      comment,
      verified: !!hasPurchased
    });
    
    // Update product rating and review count
    const totalReviews = product.reviews.length;
    const averageRating = product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / totalReviews;
    
    product.rating = Math.round(averageRating * 10) / 10; // Round to 1 decimal
    product.reviewCount = totalReviews;
    
    await product.save();
    
    return NextResponse.json({ 
      message: 'Review added successfully',
      review: product.reviews[product.reviews.length - 1]
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
