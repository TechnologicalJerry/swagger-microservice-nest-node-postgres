import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { PaymentStatus } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>) {}

  private generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `TXN-${timestamp}-${random}`;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const transactionId = this.generateTransactionId();

    const payment = new this.paymentModel({
      transactionId,
      orderId: createPaymentDto.orderId,
      userId: createPaymentDto.userId,
      amount: createPaymentDto.amount,
      paymentMethod: createPaymentDto.paymentMethod,
      paymentDetails: createPaymentDto.paymentDetails,
      notes: createPaymentDto.notes,
      status: PaymentStatus.PENDING,
    });

    // Simulate payment processing
    // In a real application, this would integrate with payment gateways
    setTimeout(async () => {
      const paymentDoc = await this.paymentModel.findById(payment._id);
      if (paymentDoc && paymentDoc.status === PaymentStatus.PENDING) {
        // Simulate successful payment (90% success rate)
        const isSuccess = Math.random() > 0.1;
        paymentDoc.status = isSuccess ? PaymentStatus.COMPLETED : PaymentStatus.FAILED;
        paymentDoc.processedAt = new Date();
        if (!isSuccess) {
          paymentDoc.failedAt = new Date();
          paymentDoc.failureReason = 'Payment gateway declined transaction';
        }
        await paymentDoc.save();
      }
    }, 2000);

    return payment.save();
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(id).exec();
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async findByOrder(orderId: string): Promise<Payment[]> {
    return this.paymentModel.find({ orderId }).sort({ createdAt: -1 }).exec();
  }

  async findByUser(userId: string): Promise<Payment[]> {
    return this.paymentModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findByStatus(status: PaymentStatus): Promise<Payment[]> {
    return this.paymentModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: PaymentStatus, failureReason?: string): Promise<Payment> {
    const updateData: any = { status };
    
    if (status === PaymentStatus.COMPLETED) {
      updateData.processedAt = new Date();
    } else if (status === PaymentStatus.FAILED) {
      updateData.failedAt = new Date();
      updateData.failureReason = failureReason || 'Payment processing failed';
    }

    const payment = await this.paymentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async refund(refundPaymentDto: RefundPaymentDto): Promise<Payment> {
    const payment = await this.paymentModel.findById(refundPaymentDto.paymentId).exec();
    
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${refundPaymentDto.paymentId} not found`);
    }

    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    if (payment.status === PaymentStatus.REFUNDED) {
      throw new BadRequestException('Payment has already been refunded');
    }

    const refundAmount = refundPaymentDto.amount || payment.amount;

    if (refundAmount > payment.amount) {
      throw new BadRequestException('Refund amount cannot exceed payment amount');
    }

    payment.status = PaymentStatus.REFUNDED;
    payment.refundAmount = refundAmount;
    payment.refundReason = refundPaymentDto.reason;
    payment.refundedAt = new Date();

    return payment.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
