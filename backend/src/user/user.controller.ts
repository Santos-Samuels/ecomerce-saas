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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleById } from '@ecomerce/shared';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data, RoleById.Customer);
  }

  @Post('admin')
  @Roles(RoleById.Staff)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data, RoleById.Admin);
  }

  @Post('staff')
  @Roles(RoleById.Staff)
  createForStaff(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  @Roles(RoleById.Staff)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(RoleById.Staff, RoleById.Customer)
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleById.Staff, RoleById.Customer)
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleById.Staff, RoleById.Customer)
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
