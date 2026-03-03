import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { requireAdmin } from '@/lib/auth';

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const POST = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();
    const body = await request.json();

    // Auto-generate slug from name if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single
    }

    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
