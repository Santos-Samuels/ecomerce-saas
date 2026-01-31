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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(RoleById.Staff)
  create(@Body() data: CreateRoleDto): Promise<Role> {
    return this.roleService.create(data);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Promise<Role> {
    return this.roleService.findByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Staff)
  update(@Param('id') id: string, @Body() data: UpdateRoleDto): Promise<Role> {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleById.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.roleService.remove(id);
  }
}
