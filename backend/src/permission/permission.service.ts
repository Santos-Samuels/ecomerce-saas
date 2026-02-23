import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePermissionDto): Promise<Permission> {
    const created = await this.prisma.permission.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
      },
    });

    return this.map(created);
  }

  async findAll(): Promise<Permission[]> {
    const items = await this.prisma.permission.findMany({
      orderBy: { code: 'asc' },
    });
    return items.map((p) => this.map(p));
  }

  async findOne(id: string): Promise<Permission> {
    const item = await this.prisma.permission.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Permission not found');
    }

    return this.map(item);
  }

  async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
    await this.findOne(id);

    const updated = await this.prisma.permission.update({
      where: { id },
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
      },
    });

    return this.map(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.permission.delete({
      where: { id },
    });
  }

  private map(db: {
    id: string;
    code: string;
    name: string;
    description: string | null;
  }): Permission {
    return {
      id: db.id,
      code: db.code,
      name: db.name,
      description: db.description ?? undefined,
    };
  }
}
