import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';
import Order from '@/models/Order';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Check if user is authenticated
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, orderAmount } = body;

    if (!code || !orderAmount) {
      return NextResponse.json(
        { error: 'Coupon code and order amount are required' },
        { status: 400 }
      );
    }

    // Find active coupon
    const coupon = await Coupon.findOne({ 
      code: code.toUpperCase(),
      isActive: true
    });

    if (!coupon) {
      return NextResponse.json(
        { error: 'Invalid coupon code', valid: false },
        { status: 404 }
      );
    }

    // Check if coupon is expired
    const now = new Date();
    if (now < coupon.validFrom) {
      return NextResponse.json(
        { error: 'Coupon is not yet valid', valid: false },
        { status: 400 }
      );
    }
    if (now > coupon.validUntil) {
      return NextResponse.json(
        { error: 'Coupon has expired', valid: false },
        { status: 400 }
      );
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json(
        { error: 'Coupon usage limit reached', valid: false },
        { status: 400 }
      );
    }

    // Check minimum purchase amount
    if (coupon.minPurchase && orderAmount < coupon.minPurchase) {
      return NextResponse.json(
        { 
          error: `Minimum purchase of ₹${coupon.minPurchase} required`,
          valid: false,
          minPurchase: coupon.minPurchase
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = (orderAmount * coupon.value) / 100;
      // Apply max discount cap if set
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      // Fixed discount
      discountAmount = coupon.value;
    }

    // Ensure discount doesn't exceed order amount
    discountAmount = Math.min(discountAmount, orderAmount);

    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        description: coupon.description
      },
      discountAmount: Math.round(discountAmount),
      finalAmount: orderAmount - discountAmount,
      message: 'Coupon applied successfully!'
    });

  } catch (error: any) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Record coupon usage after successful order
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { couponCode, orderId, orderAmount, discountAmount } = body;

    if (!couponCode || !orderId || !orderAmount || !discountAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update coupon usage
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
    
    if (!coupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    // Add to usedBy array
    coupon.usedBy.push({
      userId: user.userId,
      userEmail: user.email,
      orderId,
      orderAmount,
      discountAmount,
      usedAt: new Date()
    });

    // Increment usage count
    coupon.usedCount += 1;
    
    await coupon.save();

    return NextResponse.json({ message: 'Coupon usage recorded' });

  } catch (error: any) {
    console.error('Error recording coupon usage:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
