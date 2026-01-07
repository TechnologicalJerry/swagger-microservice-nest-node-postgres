import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { StockInDto } from './dto/stock-in.dto';
import { StockOutDto } from './dto/stock-out.dto';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('stock-in')
  @ApiOperation({ summary: 'Add stock to inventory' })
  @ApiResponse({ status: 201, description: 'Stock added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  stockIn(@Body() stockInDto: StockInDto) {
    return this.inventoryService.stockIn(stockInDto);
  }

  @Post('stock-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove stock from inventory' })
  @ApiResponse({ status: 200, description: 'Stock removed successfully' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  stockOut(@Body() stockOutDto: StockOutDto) {
    return this.inventoryService.stockOut(stockOutDto);
  }

  @Get('stock-level/:productId')
  @ApiOperation({ summary: 'Get stock level for a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Stock level retrieved' })
  getStockLevel(@Param('productId') productId: string) {
    return this.inventoryService.getStockLevel(productId);
  }

  @Get('stock-levels')
  @ApiOperation({ summary: 'Get all stock levels' })
  @ApiResponse({ status: 200, description: 'List of all stock levels' })
  getAllStockLevels() {
    return this.inventoryService.getAllStockLevels();
  }

  @Get('history/:productId')
  @ApiOperation({ summary: 'Get inventory transaction history for a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of records to return' })
  @ApiResponse({ status: 200, description: 'Transaction history retrieved' })
  getInventoryHistory(@Param('productId') productId: string, @Query('limit') limit?: number) {
    return this.inventoryService.getInventoryHistory(productId, limit ? parseInt(limit.toString()) : 50);
  }

  @Post('reserve/:productId')
  @ApiOperation({ summary: 'Reserve stock for a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Stock reserved successfully' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  reserveStock(@Param('productId') productId: string, @Body('quantity') quantity: number) {
    return this.inventoryService.reserveStock(productId, quantity);
  }

  @Post('release/:productId')
  @ApiOperation({ summary: 'Release reserved stock for a product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Reserved stock released successfully' })
  @ApiResponse({ status: 400, description: 'Cannot release more than reserved' })
  releaseReservedStock(@Param('productId') productId: string, @Body('quantity') quantity: number) {
    return this.inventoryService.releaseReservedStock(productId, quantity);
  }
}
