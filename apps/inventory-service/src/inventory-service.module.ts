import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [InventoryModule],
  controllers: [InventoryServiceController],
  providers: [InventoryServiceService],
})
export class InventoryServiceModule {}
