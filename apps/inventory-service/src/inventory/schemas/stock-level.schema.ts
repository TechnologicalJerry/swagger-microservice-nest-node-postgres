import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockLevelDocument = StockLevel & Document;

@Schema({ timestamps: true })
export class StockLevel {
  @Prop({ required: true, unique: true })
  productId: string;

  @Prop({ required: true, min: 0, default: 0 })
  currentStock: number;

  @Prop({ min: 0, default: 0 })
  reservedStock: number;

  @Prop({ min: 0, default: 0 })
  availableStock: number;

  @Prop()
  location?: string;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const StockLevelSchema = SchemaFactory.createForClass(StockLevel);

// Index for faster queries
StockLevelSchema.index({ productId: 1 });

