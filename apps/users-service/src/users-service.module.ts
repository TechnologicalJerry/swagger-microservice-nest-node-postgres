import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersServiceController } from './users-service.controller';
import { UsersServiceService } from './users-service.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [UsersServiceController],
  providers: [UsersServiceService],
})
export class UsersServiceModule {}
