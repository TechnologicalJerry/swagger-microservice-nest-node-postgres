import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SendSmsDto {
  @ApiProperty({ example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({ example: 'Your order has been shipped' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ example: 'order-id-123', required: false })
  @IsOptional()
  @IsString()
  relatedEntityId?: string;

  @ApiProperty({ example: 'order', required: false })
  @IsOptional()
  @IsString()
  relatedEntityType?: string;
}

