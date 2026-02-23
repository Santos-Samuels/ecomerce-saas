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
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './permission.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';

@Controller('permissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Roles(RoleById.Staff)
  create(@Body() data: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(data);
  }

  @Get()
  @Roles(RoleById.Staff)
  findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @Roles(RoleById.Staff)
  findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Staff)
  update(
    @Param('id') id: string,
    @Body() data: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleById.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.permissionService.remove(id);
  }
}
