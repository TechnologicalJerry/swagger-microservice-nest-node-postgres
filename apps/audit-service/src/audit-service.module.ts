import { Module } from '@nestjs/common';
import { AuditServiceController } from './audit-service.controller';
import { AuditServiceService } from './audit-service.service';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [AuditServiceController],
  providers: [AuditServiceService],
})
export class AuditServiceModule {}
