import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

export class OrderItemDto {
  @ApiProperty({ example: 'product-id-123' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 99.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Product Name', required: false })
  @IsOptional()
  @IsString()
  productName?: string;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'user-id-123' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({ example: '123 Main St', required: false })
  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @ApiProperty({ example: 'New York', required: false })
  @IsOptional()
  @IsString()
  shippingCity?: string;

  @ApiProperty({ example: 'NY', required: false })
  @IsOptional()
  @IsString()
  shippingState?: string;

  @ApiProperty({ example: '10001', required: false })
  @IsOptional()
  @IsString()
  shippingZipCode?: string;

  @ApiProperty({ example: 'USA', required: false })
  @IsOptional()
  @IsString()
  shippingCountry?: string;

  @ApiProperty({ example: 'Customer notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

