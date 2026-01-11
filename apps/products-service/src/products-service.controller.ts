import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products Service')
@Controller()
export class ProductsServiceController {
  @Get('health')
  getHealth(): { status: string; service: string } {
    return { status: 'ok', service: 'products-service' };
  }
}
