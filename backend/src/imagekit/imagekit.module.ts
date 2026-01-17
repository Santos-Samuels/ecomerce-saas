import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ImageKitController } from './imagekit.controller';
import { ImageKitService } from './imagekit.service';
import { imageKitProvider } from './imagekit.provider';

@Module({
  imports: [AuthModule],
  controllers: [ImageKitController],
  providers: [ImageKitService, imageKitProvider],
})
export class ImageKitModule {}
