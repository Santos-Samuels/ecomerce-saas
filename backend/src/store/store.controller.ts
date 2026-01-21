import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';
import { Public } from '../auth/public.decorator';

@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('current')
  @Public()
  findCurrent(@Req() req: Request) {
    const tenantId = (req as any).tenantId;
    const user = (req as any).user;

    // Priority 1: Subdomain (Public access)
    if (tenantId) {
      return this.storeService.findPublicInfo(tenantId);
    }

    // Priority 2: Token (Admin access)
    if (user?.storeId) {
      return this.storeService.findPublicInfo(user.storeId);
    }

    throw new NotFoundException('Store context not found');
  }

  @Post()
  @Roles(RoleById.Staff)
  create(@Body() data: CreateStoreDto): Promise<Store> {
    return this.storeService.create(data);
  }

  @Get()
  @Roles(RoleById.Staff)
  findAll(): Promise<Store[]> {
    return this.storeService.findAll();
  }

  @Get(':id')
  @Roles(RoleById.Admin, RoleById.Staff)
  findOne(@Param('id') id: string): Promise<Store> {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Staff, RoleById.Admin)
  update(
    @Param('id') id: string,
    @Body() data: UpdateStoreDto,
  ): Promise<Store> {
    return this.storeService.update(id, data);
  }

  @Patch(':id/activate')
  @Roles(RoleById.Staff)
  activate(@Param('id') id: string): Promise<Store> {
    return this.storeService.activate(id);
  }

  @Delete(':id')
  @Roles(RoleById.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.storeService.remove(id);
  }
}
