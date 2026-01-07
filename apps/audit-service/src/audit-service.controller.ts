import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Audit Service')
@Controller()
export class AuditServiceController {
  @Get('health')
  getHealth(): { status: string; service: string } {
    return { status: 'ok', service: 'audit-service' };
  }
}
