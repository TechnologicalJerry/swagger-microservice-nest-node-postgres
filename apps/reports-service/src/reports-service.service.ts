import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
