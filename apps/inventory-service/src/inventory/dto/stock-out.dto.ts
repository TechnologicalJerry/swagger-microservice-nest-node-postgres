import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, IsDateString } from 'class-validator';

export class StockOutDto {
  @ApiProperty({ example: 'product-id-123' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 50 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 'Warehouse A', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'Order fulfillment', required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ example: 'Shipped to customer', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ example: 'user-id-123', required: false })
  @IsOptional()
  @IsString()
  userId?: string;
}

