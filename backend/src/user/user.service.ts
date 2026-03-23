import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as crypto from 'crypto';
import { RoleById } from '@ecomerce/shared';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto, roleName?: RoleById): Promise<User> {
    const passwordHash = data.password
      ? this.hashPassword(data.password)
      : undefined;

    let roleId = data.roleId;

    if (!roleId && roleName) {
      const role = await this.prisma.role.findFirst({
        where: { name: roleName, active: true },
      });

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      roleId = role.id;
    }

    if (!roleId) {
      throw new NotFoundException('Role ID or Role Name must be provided');
    }

    return this.prisma.user.create({
      data: {
        storeId: data.storeId,
        roleId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        active: data.active ?? true,
        passwordHash,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { active: true },
      include: {
        role: true,
        store: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id, active: true },
      include: {
        role: true,
        store: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    const { password, ...rest } = data;

    const updateData: {
      storeId?: string;
      roleId?: string;
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      active?: boolean;
      passwordHash?: string;
    } = { ...rest };

    if (password) {
      updateData.passwordHash = this.hashPassword(password);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.user.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
