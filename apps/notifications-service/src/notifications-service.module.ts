import { Module } from '@nestjs/common';
import { NotificationsServiceController } from './notifications-service.controller';
import { NotificationsServiceService } from './notifications-service.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [NotificationsServiceController],
  providers: [NotificationsServiceService],
})
export class NotificationsServiceModule {}
