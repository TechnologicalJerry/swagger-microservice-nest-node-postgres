import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments Service')
@Controller()
export class PaymentsServiceController {
  @Get('health')
  getHealth(): { status: string; service: string } {
    return { status: 'ok', service: 'payments-service' };
  }
}
