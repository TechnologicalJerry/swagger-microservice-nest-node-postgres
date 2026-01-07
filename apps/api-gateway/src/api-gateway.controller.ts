import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  Req,
  All,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiGatewayService } from './api-gateway.service';
import { Request } from 'express';

@ApiTags('API Gateway')
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('health')
  @ApiOperation({ summary: 'API Gateway health check' })
  getHealth() {
    return {
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
    };
  }

  @All('users*')
  @ApiOperation({ summary: 'Proxy to Users Service' })
  @ApiBearerAuth()
  async proxyUsers(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/users', '') || '/users';
    return this.apiGatewayService.proxyRequest(
      'users',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('auth*')
  @ApiOperation({ summary: 'Proxy to Auth Service' })
  async proxyAuth(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/auth', '') || '/auth';
    return this.apiGatewayService.proxyRequest(
      'auth',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('products*')
  @ApiOperation({ summary: 'Proxy to Products Service' })
  @ApiBearerAuth()
  async proxyProducts(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/products', '') || '/products';
    return this.apiGatewayService.proxyRequest(
      'products',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('inventory*')
  @ApiOperation({ summary: 'Proxy to Inventory Service' })
  @ApiBearerAuth()
  async proxyInventory(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/inventory', '') || '/inventory';
    return this.apiGatewayService.proxyRequest(
      'inventory',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('orders*')
  @ApiOperation({ summary: 'Proxy to Orders Service' })
  @ApiBearerAuth()
  async proxyOrders(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/orders', '') || '/orders';
    return this.apiGatewayService.proxyRequest(
      'orders',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('payments*')
  @ApiOperation({ summary: 'Proxy to Payments Service' })
  @ApiBearerAuth()
  async proxyPayments(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/payments', '') || '/payments';
    return this.apiGatewayService.proxyRequest(
      'payments',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('notifications*')
  @ApiOperation({ summary: 'Proxy to Notifications Service' })
  @ApiBearerAuth()
  async proxyNotifications(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/notifications', '') || '/notifications';
    return this.apiGatewayService.proxyRequest(
      'notifications',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('reports*')
  @ApiOperation({ summary: 'Proxy to Reports Service' })
  @ApiBearerAuth()
  async proxyReports(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/reports', '') || '/reports';
    return this.apiGatewayService.proxyRequest(
      'reports',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }

  @All('audit*')
  @ApiOperation({ summary: 'Proxy to Audit Service' })
  @ApiBearerAuth()
  async proxyAudit(@Req() req: Request, @Body() body?: any) {
    const path = req.url.replace('/audit', '') || '/audit';
    return this.apiGatewayService.proxyRequest(
      'audit',
      path,
      req.method,
      body,
      req.headers as any,
    );
  }
}
