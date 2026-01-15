import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({
      where: { active: true },
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.prisma.role.findFirst({
      where: { id, active: true },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: string, data: UpdateRoleDto): Promise<Role> {
    await this.findOne(id);

    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.role.update({
      where: { id },
      data: { active: false },
    });
  }
}
