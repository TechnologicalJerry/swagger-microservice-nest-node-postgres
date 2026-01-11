import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsServiceService {
  getHello(): string {
    return 'Payments Service is running';
  }
}
