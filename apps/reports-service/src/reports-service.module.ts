import { Module } from '@nestjs/common';
import { ReportsServiceController } from './reports-service.controller';
import { ReportsServiceService } from './reports-service.service';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ReportsModule],
  controllers: [ReportsServiceController],
  providers: [ReportsServiceService],
})
export class ReportsServiceModule {}
