import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditServiceService {
  getHello(): string {
    return 'Audit Service is running';
  }
}
