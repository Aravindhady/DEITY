import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';
import { requireAdmin } from '@/lib/auth';

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();

    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean();

    // Calculate usage statistics for each coupon
    const couponsWithStats = coupons.map(coupon => ({
      ...coupon,
      usagePercentage: coupon.usageLimit ? Math.round((coupon.usedCount / coupon.usageLimit) * 100) : 0,
      isExpired: new Date(coupon.validUntil) < new Date(),
      isActiveNow: coupon.isActive && new Date(coupon.validFrom) <= new Date() && new Date(coupon.validUntil) >= new Date()
    }));

    return NextResponse.json(couponsWithStats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const POST = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();
    const body = await request.json();

    // Validate required fields
    if (!body.code || !body.type || !body.value || !body.validFrom || !body.validUntil) {
      return NextResponse.json(
        { error: 'Missing required fields: code, type, value, validFrom, validUntil' },
        { status: 400 }
      );
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: body.code.toUpperCase() });
    if (existingCoupon) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }

    // Validate dates
    const validFrom = new Date(body.validFrom);
    const validUntil = new Date(body.validUntil);
    
    if (validFrom > validUntil) {
      return NextResponse.json(
        { error: 'Valid from date must be before valid until date' },
        { status: 400 }
      );
    }

    // Validate percentage value
    if (body.type === 'percentage' && (body.value < 0 || body.value > 100)) {
      return NextResponse.json(
        { error: 'Percentage discount must be between 0 and 100' },
        { status: 400 }
      );
    }

    const coupon = new Coupon({
      ...body,
      code: body.code.toUpperCase(),
      usedBy: []
    });
    await coupon.save();

    return NextResponse.json(coupon, { status: 201 });
  } catch (error: any) {
    console.error('Error creating coupon:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
