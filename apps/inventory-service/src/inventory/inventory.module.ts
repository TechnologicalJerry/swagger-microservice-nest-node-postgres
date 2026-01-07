import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory, InventorySchema } from './schemas/inventory.schema';
import { StockLevel, StockLevelSchema } from './schemas/stock-level.schema';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Inventory.name, schema: InventorySchema },
      { name: StockLevel.name, schema: StockLevelSchema },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
