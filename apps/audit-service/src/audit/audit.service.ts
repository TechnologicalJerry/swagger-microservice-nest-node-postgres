import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogDocument, AuditAction } from './schemas/audit-log.schema';

export interface CreateAuditLogDto {
  userId: string;
  userName?: string;
  action: AuditAction;
  entityType: string;
  entityId?: string;
  description?: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

@Injectable()
export class AuditService {
  constructor(@InjectModel(AuditLog.name) private auditLogModel: Model<AuditLogDocument>) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const auditLog = new this.auditLogModel(createAuditLogDto);
    return auditLog.save();
  }

  async findAll(limit: number = 100): Promise<AuditLog[]> {
    return this.auditLogModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async findByUser(userId: string, limit: number = 100): Promise<AuditLog[]> {
    return this.auditLogModel.find({ userId }).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async findByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    return this.auditLogModel
      .find({ entityType, entityId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByAction(action: AuditAction, limit: number = 100): Promise<AuditLog[]> {
    return this.auditLogModel.find({ action }).sort({ createdAt: -1 }).limit(limit).exec();
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<AuditLog[]> {
    return this.auditLogModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}
