import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiGatewayService {
  private readonly services = {
    users: process.env.USERS_SERVICE_URL || 'http://localhost:3001',
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
    products: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3003',
    inventory: process.env.INVENTORY_SERVICE_URL || 'http://localhost:3004',
    orders: process.env.ORDERS_SERVICE_URL || 'http://localhost:3005',
    payments: process.env.PAYMENTS_SERVICE_URL || 'http://localhost:3006',
    notifications: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3007',
    reports: process.env.REPORTS_SERVICE_URL || 'http://localhost:3008',
    audit: process.env.AUDIT_SERVICE_URL || 'http://localhost:3009',
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async proxyRequest(serviceName: string, path: string, method: string, data?: any, headers?: any) {
    const baseUrl = this.services[serviceName];
    if (!baseUrl) {
      throw new HttpException(`Service ${serviceName} not found`, HttpStatus.NOT_FOUND);
    }

    try {
      const url = `${baseUrl}${path}`;
      const config = {
        method: method.toLowerCase(),
        url,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        ...(data && { data }),
      };

      const response = await firstValueFrom(this.httpService.request(config));
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw new HttpException(
        `Error connecting to ${serviceName} service`,
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
