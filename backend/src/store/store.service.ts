import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStoreDto): Promise<Store> {
    return this.prisma.store.create({ data });
  }

  async findAll(): Promise<Store[]> {
    return this.prisma.store.findMany({
      where: { active: true },
    });
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.prisma.store.findFirst({
      where: { id, active: true },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async findPublicInfo(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        logoUrl: true,
        primaryColor: true,
        instagramHandle: true,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async update(id: string, data: UpdateStoreDto): Promise<Store> {
    await this.findOne(id);

    return this.prisma.store.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.store.update({
      where: { id },
      data: { active: false, deletedAt: new Date() },
    });
  }

  async activate(id: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return this.prisma.store.update({
      where: { id },
      data: { active: true, deletedAt: null },
    });
  }
}
