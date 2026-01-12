import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductCategory } from '../dto/create-product.dto';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 0, default: 0 })
  quantity: number;

  @Prop({ enum: ProductCategory, required: true })
  category: ProductCategory;

  @Prop()
  brand?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ min: 0, default: 0 })
  minStockLevel?: number;

  @Prop({ min: 0 })
  maxStockLevel?: number;

  @Prop()
  unit?: string;

  @Prop({ min: 0 })
  weight?: number;

  @Prop({
    type: {
      length: Number,
      width: Number,
      height: Number,
    },
  })
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

