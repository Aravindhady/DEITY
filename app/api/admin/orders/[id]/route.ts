import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { requireAdmin } from '@/lib/auth';

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  // Extract user from request
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify token to get user
  try {
    const jwt = await import('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    const user: any = jwt.default.verify(token, JWT_SECRET);
    
    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }
  } catch (error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await connectDB();
    const body = await request.json();

    const order = await Order.findByIdAndUpdate(params.id, body, { new: true });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
