import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { AuditService, CreateAuditLogDto } from './audit.service';
import { AuditAction } from './schemas/audit-log.schema';

@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiOperation({ summary: 'Create an audit log entry' })
  @ApiResponse({ status: 201, description: 'Audit log created successfully' })
  create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditService.create(createAuditLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all audit logs' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of records to return' })
  @ApiResponse({ status: 200, description: 'List of audit logs' })
  findAll(@Query('limit') limit?: number) {
    return this.auditService.findAll(limit ? parseInt(limit.toString()) : 100);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get audit logs for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'User audit logs retrieved' })
  findByUser(@Param('userId') userId: string, @Query('limit') limit?: number) {
    return this.auditService.findByUser(userId, limit ? parseInt(limit.toString()) : 100);
  }

  @Get('entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Get audit logs for an entity' })
  @ApiParam({ name: 'entityType', description: 'Entity type' })
  @ApiParam({ name: 'entityId', description: 'Entity ID' })
  @ApiResponse({ status: 200, description: 'Entity audit logs retrieved' })
  findByEntity(@Param('entityType') entityType: string, @Param('entityId') entityId: string) {
    return this.auditService.findByEntity(entityType, entityId);
  }

  @Get('action/:action')
  @ApiOperation({ summary: 'Get audit logs by action' })
  @ApiParam({ name: 'action', enum: AuditAction, description: 'Action type' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Action audit logs retrieved' })
  findByAction(@Param('action') action: AuditAction, @Query('limit') limit?: number) {
    return this.auditService.findByAction(action, limit ? parseInt(limit.toString()) : 100);
  }

  @Get('date-range')
  @ApiOperation({ summary: 'Get audit logs by date range' })
  @ApiQuery({ name: 'startDate', required: true, type: Date, description: 'Start date' })
  @ApiQuery({ name: 'endDate', required: true, type: Date, description: 'End date' })
  @ApiResponse({ status: 200, description: 'Date range audit logs retrieved' })
  findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.auditService.findByDateRange(new Date(startDate), new Date(endDate));
  }
}

