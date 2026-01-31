import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreLayoutDto } from './dto/create-store-layout.dto';
import { UpdateStoreLayoutDto } from './dto/update-store-layout.dto';

@Injectable()
export class StoreLayoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreLayoutDto: CreateStoreLayoutDto) {
    return this.prisma.storeLayout.create({
      data: createStoreLayoutDto,
    });
  }

  async findAll(storeId: string) {
    return this.prisma.storeLayout.findUnique({
      where: { storeId },
    });
  }

  async update(storeId: string, updateStoreLayoutDto: UpdateStoreLayoutDto) {
    return this.prisma.storeLayout.upsert({
      where: { storeId },
      create: {
        storeId,
        ...updateStoreLayoutDto,
      },
      update: updateStoreLayoutDto,
    });
  }
}
