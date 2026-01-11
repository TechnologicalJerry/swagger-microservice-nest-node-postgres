import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsServiceController } from './products-service.controller';
import { ProductsServiceService } from './products-service.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
  ],
  controllers: [ProductsServiceController],
  providers: [ProductsServiceService],
})
export class ProductsServiceModule {}
