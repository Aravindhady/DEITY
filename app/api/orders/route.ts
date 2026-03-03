import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { requireAuth } from '@/lib/auth';
import { generateOrderNumber } from '@/lib/utils';

export const POST = requireAuth(async (request: NextRequest, user) => {
  try {
    await connectDB();
    const body = await request.json();

    const { items, shippingAddress, couponCode } = body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        );
      }

      const price = product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: product.images[0],
      });
    }

    const shipping = 10; // Fixed shipping for now
    const tax = subtotal * 0.1; // 10% tax
    const discount = 0; // Calculate discount from coupon if needed
    const total = subtotal + shipping + tax - discount;

    const order = new Order({
      userId: user.userId,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      subtotal,
      shipping,
      tax,
      discount,
      total,
      couponCode,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'pending',
    });

    await order.save();

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const GET = requireAuth(async (request: NextRequest, user) => {
  try {
    await connectDB();

    const orders = await Order.find({ userId: user.userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
