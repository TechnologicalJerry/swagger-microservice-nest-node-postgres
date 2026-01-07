import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsServiceService {
  getHello(): string {
    return 'Notifications Service is running';
  }
}
