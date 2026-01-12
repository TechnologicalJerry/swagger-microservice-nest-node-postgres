import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportsServiceController } from './reports-service.controller';
import { ReportsServiceService } from './reports-service.service';
import { ReportsModule } from './reports/reports.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ReportsModule,
  ],
  controllers: [ReportsServiceController],
  providers: [ReportsServiceService],
})
export class ReportsServiceModule {}
