import { RoleById } from '@ecomerce/shared';
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { AuthenticatedRequest } from '../common/types';
import { UpdateStoreLayoutDto } from './dto/update-store-layout.dto';
import { StoreLayoutService } from './store-layout.service';

@Controller('store-layout')
export class StoreLayoutController {
  constructor(private readonly storeLayoutService: StoreLayoutService) {}

  @Get()
  @Public()
  findAll(@Req() req: AuthenticatedRequest) {
    const tenantId = req.tenantId;
    const user = req.user;

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
