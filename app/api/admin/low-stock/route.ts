import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { requireAdmin } from '@/lib/auth';

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();

    // Get products with stock less than 10
    const lowStockProducts = await Product.find({ 
      stock: { $lt: 10 } 
    })
    .select('name slug stock sku category images')
    .sort({ stock: 1 }) // Sort by lowest stock first
    .lean();

    return NextResponse.json(lowStockProducts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
