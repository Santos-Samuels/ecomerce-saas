import { Module } from '@nestjs/common';
import { StoreLayoutService } from './store-layout.service';
import { StoreLayoutController } from './store-layout.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StoreLayoutController],
  providers: [StoreLayoutService],
})
export class StoreLayoutModule {}
