import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsOptional, IsArray } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @ApiProperty({ example: ['cc@example.com'], required: false })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  cc?: string[];

  @ApiProperty({ example: ['bcc@example.com'], required: false })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  bcc?: string[];

  @ApiProperty({ example: 'Order Confirmation' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ example: 'Your order has been confirmed' })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ example: '<html>...</html>', required: false })
  @IsOptional()
  @IsString()
  htmlBody?: string;

  @ApiProperty({ example: 'order-id-123', required: false })
  @IsOptional()
  @IsString()
  relatedEntityId?: string;

  @ApiProperty({ example: 'order', required: false })
  @IsOptional()
  @IsString()
  relatedEntityType?: string;
}

