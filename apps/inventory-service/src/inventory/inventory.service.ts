import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockInDto } from './dto/stock-in.dto';
import { StockOutDto } from './dto/stock-out.dto';
import { Inventory, InventoryDocument, InventoryTransactionType } from './schemas/inventory.schema';
import { StockLevel, StockLevelDocument } from './schemas/stock-level.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
    @InjectModel(StockLevel.name) private stockLevelModel: Model<StockLevelDocument>,
  ) {}

  async stockIn(stockInDto: StockInDto): Promise<Inventory> {
    const transaction = new this.inventoryModel({
      ...stockInDto,
      type: InventoryTransactionType.STOCK_IN,
      transactionDate: stockInDto.date ? new Date(stockInDto.date) : new Date(),
    });

    await transaction.save();

    // Update stock level
    await this.updateStockLevel(stockInDto.productId, stockInDto.quantity, 'in');

    return transaction;
  }

  async stockOut(stockOutDto: StockOutDto): Promise<Inventory> {
    // Check available stock
    const stockLevel = await this.stockLevelModel.findOne({ productId: stockOutDto.productId });
    if (!stockLevel || stockLevel.availableStock < stockOutDto.quantity) {
      throw new BadRequestException('Insufficient stock available');
    }

    const transaction = new this.inventoryModel({
      ...stockOutDto,
      type: InventoryTransactionType.STOCK_OUT,
      transactionDate: stockOutDto.date ? new Date(stockOutDto.date) : new Date(),
    });

    await transaction.save();

    // Update stock level
    await this.updateStockLevel(stockOutDto.productId, -stockOutDto.quantity, 'out');

    return transaction;
  }

  async getStockLevel(productId: string): Promise<StockLevel> {
    const stockLevel = await this.stockLevelModel.findOne({ productId });
    if (!stockLevel) {
      return this.stockLevelModel.create({
        productId,
        currentStock: 0,
        reservedStock: 0,
        availableStock: 0,
      });
    }
    return stockLevel;
  }

  async getAllStockLevels(): Promise<StockLevel[]> {
    return this.stockLevelModel.find().exec();
  }

  async getInventoryHistory(productId: string, limit: number = 50): Promise<Inventory[]> {
    return this.inventoryModel
      .find({ productId })
      .sort({ transactionDate: -1 })
      .limit(limit)
      .exec();
  }

  async reserveStock(productId: string, quantity: number): Promise<StockLevel> {
    const stockLevel = await this.getStockLevel(productId);
    
    if (stockLevel.availableStock < quantity) {
      throw new BadRequestException('Insufficient stock available for reservation');
    }

    stockLevel.reservedStock += quantity;
    stockLevel.availableStock -= quantity;
    stockLevel.lastUpdated = new Date();

    return stockLevel.save();
  }

  async releaseReservedStock(productId: string, quantity: number): Promise<StockLevel> {
    const stockLevel = await this.getStockLevel(productId);
    
    if (stockLevel.reservedStock < quantity) {
      throw new BadRequestException('Cannot release more stock than reserved');
    }

    stockLevel.reservedStock -= quantity;
    stockLevel.availableStock += quantity;
    stockLevel.lastUpdated = new Date();

    return stockLevel.save();
  }

  private async updateStockLevel(
    productId: string,
    quantity: number,
    direction: 'in' | 'out',
  ): Promise<void> {
    const stockLevel = await this.stockLevelModel.findOne({ productId });

    if (!stockLevel) {
      await this.stockLevelModel.create({
        productId,
        currentStock: direction === 'in' ? quantity : 0,
        reservedStock: 0,
        availableStock: direction === 'in' ? quantity : 0,
        lastUpdated: new Date(),
      });
    } else {
      stockLevel.currentStock += quantity;
      if (direction === 'in') {
        stockLevel.availableStock += quantity;
      } else {
        stockLevel.availableStock = Math.max(0, stockLevel.availableStock - Math.abs(quantity));
      }
      stockLevel.lastUpdated = new Date();
      await stockLevel.save();
    }
  }
}
