import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
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
  findAll(@Query('storeId') storeId: string) {
    return this.storeLayoutService.findAll(storeId);
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
