import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';
import { getAuthUser } from '@/lib/auth';

// Update a coupon
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authorization
    const user = await getAuthUser(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // Validate dates if provided
    if (body.validFrom && body.validUntil) {
      const validFrom = new Date(body.validFrom);
      const validUntil = new Date(body.validUntil);
      
      if (validFrom > validUntil) {
        return NextResponse.json(
          { error: 'Valid from date must be before valid until date' },
          { status: 400 }
        );
      }
    }

    // Validate percentage value
    if (body.type === 'percentage' && body.value !== undefined && (body.value < 0 || body.value > 100)) {
      return NextResponse.json(
        { error: 'Percentage discount must be between 0 and 100' },
        { status: 400 }
      );
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params.id,
      {
        ...body,
        code: body.code ? body.code.toUpperCase() : undefined,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!updatedCoupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCoupon);
  } catch (error: any) {
    console.error('Error updating coupon:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a coupon
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authorization
    const user = await getAuthUser(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const deletedCoupon = await Coupon.findByIdAndDelete(params.id);

    if (!deletedCoupon) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Coupon deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
