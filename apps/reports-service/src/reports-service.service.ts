import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsServiceService {
  getHello(): string {
    return 'Reports Service is running';
  }
}
