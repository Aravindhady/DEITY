import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const isNewArrival = searchParams.get('isNewArrival') === 'true';
    const isLimitedEdition = searchParams.get('isLimitedEdition') === 'true';
    const isExclusive = searchParams.get('isExclusive') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');

    const query: any = {};
    if (category) query.category = category;
    if (isNewArrival) query.isNewArrival = true;
    if (isLimitedEdition) query.isLimitedEdition = true;
    if (isExclusive) query.isExclusive = true;

    const products = await Product.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const product = new Product(body);
    await product.save();

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
