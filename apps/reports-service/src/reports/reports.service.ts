import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class ReportsService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getSalesReport(startDate?: Date, endDate?: Date) {
    const ordersCollection = this.connection.collection('orders');
    const matchStage: any = {};

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
        },
      },
    ];

    const result = await ordersCollection.aggregate(pipeline).toArray();
    return result[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 };
  }

  async getProductSalesReport(startDate?: Date, endDate?: Date) {
    const ordersCollection = this.connection.collection('orders');
    const matchStage: any = {};

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const pipeline = [
      { $match: matchStage },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          productName: { $first: '$items.productName' },
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' },
        },
      },
      { $sort: { totalRevenue: -1 } },
    ];

    return ordersCollection.aggregate(pipeline).toArray();
  }

  async getInventoryReport() {
    const stockLevelsCollection = this.connection.collection('stocklevels');
    const productsCollection = this.connection.collection('products');

    const stockLevels = await stockLevelsCollection.find({}).toArray();
    const products = await productsCollection.find({}).toArray();

    const productMap = new Map(products.map((p: any) => [p._id.toString(), p]));

    return stockLevels.map((stock: any) => {
      const product = productMap.get(stock.productId);
      return {
        productId: stock.productId,
        productName: product?.name || 'Unknown',
        currentStock: stock.currentStock,
        reservedStock: stock.reservedStock,
        availableStock: stock.availableStock,
        location: stock.location,
      };
    });
  }

  async getPaymentReport(startDate?: Date, endDate?: Date) {
    const paymentsCollection = this.connection.collection('payments');
    const matchStage: any = {};

    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
    ];

    return paymentsCollection.aggregate(pipeline).toArray();
  }

  async getUserActivityReport(startDate?: Date, endDate?: Date) {
    const usersCollection = this.connection.collection('users');
    const ordersCollection = this.connection.collection('orders');
    const paymentsCollection = this.connection.collection('payments');

    const matchStage: any = {};
    if (startDate || endDate) {
      matchStage.createdAt = {};
      if (startDate) matchStage.createdAt.$gte = startDate;
      if (endDate) matchStage.createdAt.$lte = endDate;
    }

    const users = await usersCollection.find({}).toArray();
    const orders = await ordersCollection.find(matchStage).toArray();
    const payments = await paymentsCollection.find(matchStage).toArray();

    const userStats = users.map((user: any) => {
      const userOrders = orders.filter((o: any) => o.userId === user._id.toString());
      const userPayments = payments.filter((p: any) => p.userId === user._id.toString());

      return {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        totalOrders: userOrders.length,
        totalSpent: userPayments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0),
        lastOrderDate: userOrders.length > 0 ? userOrders[0].createdAt : null,
      };
    });

    return userStats.sort((a, b) => b.totalSpent - a.totalSpent);
  }
}
