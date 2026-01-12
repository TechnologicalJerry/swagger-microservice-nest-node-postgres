import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersServiceService {
  getHello(): string {
    return 'Users Service is running';
  }
}
