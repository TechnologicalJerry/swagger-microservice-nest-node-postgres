import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrdersServiceController } from './orders-service.controller';
import { OrdersServiceService } from './orders-service.service';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    OrdersModule,
  ],
  controllers: [OrdersServiceController],
  providers: [OrdersServiceService],
})
export class OrdersServiceModule {}
