import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory Service')
@Controller()
export class InventoryServiceController {
  @Get('health')
  getHealth(): { status: string; service: string } {
    return { status: 'ok', service: 'inventory-service' };
  }
}
