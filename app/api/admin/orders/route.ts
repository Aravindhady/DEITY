import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireAdmin } from '@/lib/auth';

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
