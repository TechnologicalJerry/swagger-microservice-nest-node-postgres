import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
  DELIVERED = 'delivered',
}

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: true })
  recipient: string;

  @Prop()
  subject?: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  htmlMessage?: string;

  @Prop({ enum: NotificationStatus, default: NotificationStatus.PENDING })
  status: NotificationStatus;

  @Prop()
  relatedEntityId?: string;

  @Prop()
  relatedEntityType?: string;

  @Prop()
  sentAt?: Date;

  @Prop()
  deliveredAt?: Date;

  @Prop()
  failureReason?: string;

  @Prop()
  retryCount: number;

  @Prop()
  metadata?: Record<string, any>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

// Indexes for faster queries
NotificationSchema.index({ recipient: 1, createdAt: -1 });
NotificationSchema.index({ status: 1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ relatedEntityId: 1, relatedEntityType: 1 });
NotificationSchema.index({ createdAt: -1 });

