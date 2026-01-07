import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import {
  Notification,
  NotificationDocument,
  NotificationType,
  NotificationStatus,
} from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async sendEmail(sendEmailDto: SendEmailDto): Promise<Notification> {
    const notification = new this.notificationModel({
      type: NotificationType.EMAIL,
      recipient: sendEmailDto.to,
      subject: sendEmailDto.subject,
      message: sendEmailDto.body,
      htmlMessage: sendEmailDto.htmlBody,
      status: NotificationStatus.PENDING,
      relatedEntityId: sendEmailDto.relatedEntityId,
      relatedEntityType: sendEmailDto.relatedEntityType,
      retryCount: 0,
      metadata: {
        cc: sendEmailDto.cc,
        bcc: sendEmailDto.bcc,
      },
    });

    await notification.save();

    // Simulate email sending
    // In a real application, this would integrate with email service providers (SendGrid, AWS SES, etc.)
    setTimeout(async () => {
      const notif = await this.notificationModel.findById(notification._id);
      if (notif && notif.status === NotificationStatus.PENDING) {
        // Simulate 95% success rate
        const isSuccess = Math.random() > 0.05;
        notif.status = isSuccess ? NotificationStatus.SENT : NotificationStatus.FAILED;
        notif.sentAt = new Date();
        if (!isSuccess) {
          notif.failureReason = 'Email service provider error';
        }
        await notif.save();
      }
    }, 1000);

    return notification;
  }

  async sendSms(sendSmsDto: SendSmsDto): Promise<Notification> {
    const notification = new this.notificationModel({
      type: NotificationType.SMS,
      recipient: sendSmsDto.to,
      message: sendSmsDto.message,
      status: NotificationStatus.PENDING,
      relatedEntityId: sendSmsDto.relatedEntityId,
      relatedEntityType: sendSmsDto.relatedEntityType,
      retryCount: 0,
    });

    await notification.save();

    // Simulate SMS sending
    // In a real application, this would integrate with SMS service providers (Twilio, AWS SNS, etc.)
    setTimeout(async () => {
      const notif = await this.notificationModel.findById(notification._id);
      if (notif && notif.status === NotificationStatus.PENDING) {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        notif.status = isSuccess ? NotificationStatus.SENT : NotificationStatus.FAILED;
        notif.sentAt = new Date();
        if (!isSuccess) {
          notif.failureReason = 'SMS service provider error';
        }
        await notif.save();
      }
    }, 1000);

    return notification;
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Notification> {
    return this.notificationModel.findById(id).exec();
  }

  async findByRecipient(recipient: string): Promise<Notification[]> {
    return this.notificationModel.find({ recipient }).sort({ createdAt: -1 }).exec();
  }

  async findByStatus(status: NotificationStatus): Promise<Notification[]> {
    return this.notificationModel.find({ status }).sort({ createdAt: -1 }).exec();
  }

  async findByType(type: NotificationType): Promise<Notification[]> {
    return this.notificationModel.find({ type }).sort({ createdAt: -1 }).exec();
  }

  async retryNotification(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new Error(`Notification with ID ${id} not found`);
    }

    if (notification.status === NotificationStatus.SENT) {
      throw new Error('Notification has already been sent');
    }

    notification.status = NotificationStatus.PENDING;
    notification.retryCount += 1;
    await notification.save();

    // Retry sending (simplified - in production, this would use the appropriate service)
    setTimeout(async () => {
      const notif = await this.notificationModel.findById(id);
      if (notif && notif.status === NotificationStatus.PENDING) {
        const isSuccess = Math.random() > 0.1;
        notif.status = isSuccess ? NotificationStatus.SENT : NotificationStatus.FAILED;
        notif.sentAt = new Date();
        if (!isSuccess) {
          notif.failureReason = 'Retry failed';
        }
        await notif.save();
      }
    }, 1000);

    return notification;
  }
}
