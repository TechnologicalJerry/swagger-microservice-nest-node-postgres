import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import { NotificationType, NotificationStatus } from './schemas/notification.schema';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email')
  @ApiOperation({ summary: 'Send an email notification' })
  @ApiResponse({ status: 201, description: 'Email notification sent' })
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.notificationsService.sendEmail(sendEmailDto);
  }

  @Post('sms')
  @ApiOperation({ summary: 'Send an SMS notification' })
  @ApiResponse({ status: 201, description: 'SMS notification sent' })
  sendSms(@Body() sendSmsDto: SendSmsDto) {
    return this.notificationsService.sendSms(sendSmsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiQuery({ name: 'type', required: false, enum: NotificationType, description: 'Filter by type' })
  @ApiQuery({ name: 'status', required: false, enum: NotificationStatus, description: 'Filter by status' })
  @ApiQuery({ name: 'recipient', required: false, description: 'Filter by recipient' })
  @ApiResponse({ status: 200, description: 'List of all notifications' })
  findAll(
    @Query('type') type?: NotificationType,
    @Query('status') status?: NotificationStatus,
    @Query('recipient') recipient?: string,
  ) {
    if (type) {
      return this.notificationsService.findByType(type);
    }
    if (status) {
      return this.notificationsService.findByStatus(status);
    }
    if (recipient) {
      return this.notificationsService.findByRecipient(recipient);
    }
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notification by ID' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification found' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retry sending a failed notification' })
  @ApiParam({ name: 'id', description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification retry initiated' })
  retryNotification(@Param('id') id: string) {
    return this.notificationsService.retryNotification(id);
  }
}
