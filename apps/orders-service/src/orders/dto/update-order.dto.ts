import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, OrderStatus } from './create-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ example: 'Tracking number' })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiPropertyOptional({ example: 'Admin notes' })
  @IsOptional()
  @IsString()
  adminNotes?: string;
}

