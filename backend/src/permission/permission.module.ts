import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
