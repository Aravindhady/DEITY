import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { requireAdmin } from '@/lib/auth';

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const dateFilter: any = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Total revenue
    const revenueData = await Order.aggregate([
      { $match: { ...dateFilter, paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // Total cost (assuming 40% cost, adjust based on your needs)
    const totalCost = totalRevenue * 0.4;
    const profit = totalRevenue - totalCost;

    // Order stats
    const totalOrders = await Order.countDocuments(dateFilter);
    const paidOrders = await Order.countDocuments({
      ...dateFilter,
      paymentStatus: 'paid',
    });

    // Product stats
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });

    // User stats
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Recent orders
    const recentOrders = await Order.find(dateFilter)
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({
      revenue: {
        total: totalRevenue,
        cost: totalCost,
        profit,
        margin: totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(2) : 0,
      },
      orders: {
        total: totalOrders,
        paid: paidOrders,
        pending: totalOrders - paidOrders,
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts,
      },
      users: {
        total: totalUsers,
      },
      recentOrders,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
