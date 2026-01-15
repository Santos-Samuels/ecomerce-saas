import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const passwordHash = data.password
      ? this.hashPassword(data.password)
      : undefined;

    return this.prisma.user.create({
      data: {
        storeId: data.storeId,
        roleId: data.roleId,
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
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id, active: true },
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
