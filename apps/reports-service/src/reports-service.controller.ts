import { Controller, Get } from '@nestjs/common';
import { ReportsServiceService } from './reports-service.service';

@Controller()
export class ReportsServiceController {
  constructor(private readonly reportsServiceService: ReportsServiceService) {}

  @Get()
  getHello(): string {
    return this.reportsServiceService.getHello();
  }
}
