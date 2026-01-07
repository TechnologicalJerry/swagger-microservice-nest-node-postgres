import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryDocument = Inventory & Document;

export enum InventoryTransactionType {
  STOCK_IN = 'stock_in',
  STOCK_OUT = 'stock_out',
  ADJUSTMENT = 'adjustment',
  RETURN = 'return',
}

@Schema({ timestamps: true })
export class Inventory {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true, min: 0 })
  quantity: number;

  @Prop({ required: true, enum: InventoryTransactionType })
  type: InventoryTransactionType;

  @Prop()
  location?: string;

  @Prop()
  reason?: string;

  @Prop()
  notes?: string;

  @Prop()
  userId?: string;

  @Prop({ default: Date.now })
  transactionDate: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

// Index for faster queries
InventorySchema.index({ productId: 1, transactionDate: -1 });
InventorySchema.index({ type: 1 });

