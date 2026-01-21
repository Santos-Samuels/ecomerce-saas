import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { StoreLayoutService } from './store-layout.service';
import { UpdateStoreLayoutDto } from './dto/update-store-layout.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';
import { Public } from '../auth/public.decorator';

@Controller('store-layout')
export class StoreLayoutController {
  constructor(private readonly storeLayoutService: StoreLayoutService) {}

  @Get()
  @Public()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).tenantId;
    const user = (req as any).user;

    // Priority 1: Subdomain (Public access)
    if (tenantId) {
      return this.storeLayoutService.findAll(tenantId);
    }

    // Priority 2: Token (Admin access)
    if (user?.storeId) {
      return this.storeLayoutService.findAll(user.storeId);
    }

    throw new NotFoundException('Store context not found');
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleById.Admin, RoleById.Staff)
  update(
    @Query('storeId') storeId: string,
    @Body() updateStoreLayoutDto: UpdateStoreLayoutDto,
  ) {
    return this.storeLayoutService.update(storeId, updateStoreLayoutDto);
  }
}
