import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  @ApiOperation({ summary: 'Get sales report' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Start date' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'End date' })
  @ApiResponse({ status: 200, description: 'Sales report retrieved' })
  getSalesReport(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getSalesReport(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('product-sales')
  @ApiOperation({ summary: 'Get product sales report' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Start date' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'End date' })
  @ApiResponse({ status: 200, description: 'Product sales report retrieved' })
  getProductSalesReport(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getProductSalesReport(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('inventory')
  @ApiOperation({ summary: 'Get inventory report' })
  @ApiResponse({ status: 200, description: 'Inventory report retrieved' })
  getInventoryReport() {
    return this.reportsService.getInventoryReport();
  }

  @Get('payments')
  @ApiOperation({ summary: 'Get payment report' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Start date' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'End date' })
  @ApiResponse({ status: 200, description: 'Payment report retrieved' })
  getPaymentReport(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getPaymentReport(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('user-activity')
  @ApiOperation({ summary: 'Get user activity report' })
  @ApiQuery({ name: 'startDate', required: false, type: Date, description: 'Start date' })
  @ApiQuery({ name: 'endDate', required: false, type: Date, description: 'End date' })
  @ApiResponse({ status: 200, description: 'User activity report retrieved' })
  getUserActivityReport(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.reportsService.getUserActivityReport(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}

