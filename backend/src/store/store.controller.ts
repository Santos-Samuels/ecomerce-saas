import { RoleById } from '@ecomerce/shared';
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { AuthenticatedRequest } from '../common/types';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.entity';
import { StoreService } from './store.service';

@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('current')
  @Public()
  findCurrent(@Req() req: AuthenticatedRequest) {
    const tenantId = req.tenantId;
    const user = req.user;

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
