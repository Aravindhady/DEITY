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
    const period = searchParams.get('period') || '30days';

    // Set date range based on period
    const now = new Date();
    let start = new Date();
    let end = now;
    
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    } else {
      switch (period) {
        case '7days':
          start.setDate(now.getDate() - 7);
          break;
        case '30days':
          start.setDate(now.getDate() - 30);
          break;
        case '90days':
          start.setDate(now.getDate() - 90);
          break;
        case 'year':
          start.setFullYear(now.getFullYear() - 1);
          break;
        default:
          start.setDate(now.getDate() - 30);
      }
    }

    // Sales data aggregation
    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          totalSales: { $sum: '$total' },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$total' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Top selling products
    const topProducts = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'paid'
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          productName: { $first: '$items.name' },
          quantitySold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 10 }
    ]);

    // Order status breakdown
    const orderStatusBreakdown = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: '$total' }
        }
      }
    ]);

    // Customer statistics
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: start, $lte: end },
      role: 'user'
    });

    const totalCustomers = await User.countDocuments({ role: 'user' });

    // Revenue metrics
    const totalRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const revenue = totalRevenue[0]?.total || 0;
    const totalOrdersCount = await Order.countDocuments({
      createdAt: { $gte: start, $lte: end }
    });

    return NextResponse.json({
      period: { start, end },
      salesTrend: salesData,
      topProducts,
      orderStatusBreakdown,
      customerStats: {
        newCustomers,
        totalCustomers,
        growthRate: ((newCustomers / (totalCustomers - newCustomers)) * 100).toFixed(2) || 0
      },
      revenueMetrics: {
        totalRevenue: revenue,
        totalOrders: totalOrdersCount,
        averageOrderValue: totalOrdersCount > 0 ? (revenue / totalOrdersCount).toFixed(2) : 0
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
