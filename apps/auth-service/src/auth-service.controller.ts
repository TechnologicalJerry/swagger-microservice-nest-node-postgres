import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Service')
@Controller()
export class AuthServiceController {
  @Get('health')
  getHealth(): { status: string; service: string } {
    return { status: 'ok', service: 'auth-service' };
  }
}
