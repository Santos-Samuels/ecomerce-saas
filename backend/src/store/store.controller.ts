import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';

@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

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
  @Roles(RoleById.Staff)
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
