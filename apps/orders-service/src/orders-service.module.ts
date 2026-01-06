import { Module } from '@nestjs/common';
import { OrdersServiceController } from './orders-service.controller';
import { OrdersServiceService } from './orders-service.service';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [OrdersServiceController],
  providers: [OrdersServiceService],
})
export class OrdersServiceModule {}
