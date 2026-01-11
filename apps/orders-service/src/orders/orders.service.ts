import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument, OrderItem } from './schemas/order.schema';
import { OrderStatus } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    // Calculate totals
    const subtotal = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const tax = subtotal * 0.1; // 10% tax (can be made configurable)
    const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shippingCost;

    // Map items to include subtotal
    const orderItems: OrderItem[] = createOrderDto.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    }));

    const order = new this.orderModel({
      orderNumber: this.generateOrderNumber(),
      userId: createOrderDto.userId,
      items: orderItems,
      subtotal,
      tax,
      shippingCost,
      total,
      status: OrderStatus.PENDING,
      shippingAddress: createOrderDto.shippingAddress,
      shippingCity: createOrderDto.shippingCity,
      shippingState: createOrderDto.shippingState,
      shippingZipCode: createOrderDto.shippingZipCode,
      shippingCountry: createOrderDto.shippingCountry,
      notes: createOrderDto.notes,
    });

    return order.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.orderModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Handle status changes
    if (updateOrderDto.status) {
      if (updateOrderDto.status === OrderStatus.SHIPPED && !order.shippedAt) {
        updateOrderDto['shippedAt'] = new Date();
      }
      if (updateOrderDto.status === OrderStatus.DELIVERED && !order.deliveredAt) {
        updateOrderDto['deliveredAt'] = new Date();
      }
      if (updateOrderDto.status === OrderStatus.CANCELLED && !order.cancelledAt) {
        updateOrderDto['cancelledAt'] = new Date();
      }
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .exec();

    return updatedOrder;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async updatePaymentId(orderId: string, paymentId: string): Promise<Order> {
    const order = await this.orderModel
      .findByIdAndUpdate(orderId, { paymentId }, { new: true })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }
}
