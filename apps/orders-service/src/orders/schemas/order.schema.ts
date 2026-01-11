import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../dto/create-order.dto';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop()
  productName?: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0 })
  subtotal: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  orderNumber: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ type: [Object], required: true })
  items: OrderItem[];

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ min: 0, default: 0 })
  tax: number;

  @Prop({ min: 0, default: 0 })
  shippingCost: number;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  shippingAddress?: string;

  @Prop()
  shippingCity?: string;

  @Prop()
  shippingState?: string;

  @Prop()
  shippingZipCode?: string;

  @Prop()
  shippingCountry?: string;

  @Prop()
  trackingNumber?: string;

  @Prop()
  notes?: string;

  @Prop()
  adminNotes?: string;

  @Prop()
  paymentId?: string;

  @Prop()
  shippedAt?: Date;

  @Prop()
  deliveredAt?: Date;

  @Prop()
  cancelledAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// Indexes for faster queries
OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.index({ orderNumber: 1 }, { unique: true });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

