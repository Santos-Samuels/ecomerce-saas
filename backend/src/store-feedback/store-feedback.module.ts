import { Module } from '@nestjs/common';
import { StoreFeedbackService } from './store-feedback.service';
import { StoreFeedbackController } from './store-feedback.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [StoreFeedbackController],
  providers: [StoreFeedbackService],
})
export class StoreFeedbackModule {}
