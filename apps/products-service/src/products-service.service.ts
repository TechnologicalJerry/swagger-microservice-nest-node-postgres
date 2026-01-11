import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsServiceService {
  getHello(): string {
    return 'Products Service is running';
  }
}
