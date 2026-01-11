import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsServiceController } from './payments-service.controller';
import { PaymentsServiceService } from './payments-service.service';
import { PaymentsModule } from './payments/payments.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    PaymentsModule,
  ],
  controllers: [PaymentsServiceController],
  providers: [PaymentsServiceService],
})
export class PaymentsServiceModule {}
