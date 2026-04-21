import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RoleById } from '@ecomerce/shared';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { AuthenticatedRequest } from '../common/types';
import { GalleryService } from './gallery.service';
import { CreateGalleryBatchDto } from './dto/create-gallery-batch.dto';
import { IGallery } from '@ecomerce/shared';

@Controller('gallery')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('batch')
  @Roles(RoleById.Admin, RoleById.Staff)
  createBatch(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateGalleryBatchDto,
  ): Promise<IGallery[]> {
    const storeId = req.user?.storeId;
    if (!storeId) {
      throw new UnauthorizedException();
    }
    return this.galleryService.createBatch(storeId, dto);
  }

  @Get()
  @Public()
  findAll(@Req() req: AuthenticatedRequest): Promise<IGallery[]> {
    const tenantId = req.tenantId;
    const user = req.user;

    if (tenantId) {
      return this.galleryService.findAll(tenantId);
    }

    if (user?.storeId) {
      return this.galleryService.findAll(user.storeId);
    }

    throw new NotFoundException('Store context not found');
  }

  @Get(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  findOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<IGallery> {
    const storeId = req.user?.storeId;
    if (!storeId) {
      throw new UnauthorizedException();
    }
    return this.galleryService.findOneForStore(storeId, id);
  }

  @Delete(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<void> {
    const storeId = req.user?.storeId;
    if (!storeId) {
      throw new UnauthorizedException();
    }
    return this.galleryService.remove(storeId, id);
  }
}
