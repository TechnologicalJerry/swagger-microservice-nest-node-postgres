import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class RefundPaymentDto {
  @ApiProperty({ example: 'payment-id-123' })
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @ApiPropertyOptional({ example: 50.00, description: 'Partial refund amount. If not provided, full refund' })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  amount?: number;

  @ApiProperty({ example: 'Customer requested refund', required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}

