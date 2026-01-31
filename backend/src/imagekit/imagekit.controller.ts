import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { RoleById } from '@ecomerce/shared';
import { ImageKitService } from './imagekit.service';
import type { ImageKitAuthPayload } from './imagekit.service';

@Controller('imagekit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImageKitController {
  constructor(private readonly imageKitService: ImageKitService) {}

  @Get('auth')
  @Roles(RoleById.Admin, RoleById.Staff)
  getAuth(): ImageKitAuthPayload {
    return this.imageKitService.getAuthPayload();
  }
}
