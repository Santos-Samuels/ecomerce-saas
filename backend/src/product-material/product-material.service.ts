import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductMaterialDto } from './dto/create-product-material.dto';
import { UpdateProductMaterialDto } from './dto/update-product-material.dto';
import { ProductMaterial } from './product-material.entity';

@Injectable()
export class ProductMaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductMaterialDto): Promise<ProductMaterial> {
    const existing = await this.prisma.productMaterial.findFirst({
      where: {
        storeId: data.storeId,
        name: data.name,
      },
    });

    if (existing && existing.active) {
      throw new BadRequestException('Product material already exists');
    }

    if (existing && !existing.active) {
      return this.prisma.productMaterial.update({
        where: { id: existing.id },
        data: {
          description: data.description,
          colorName: data.colorName,
          colorHex: data.colorHex,
          active: true,
        },
      });
    }

    return this.prisma.productMaterial.create({
      data,
    });
  }

  async findAll(storeId?: string): Promise<ProductMaterial[]> {
    return this.prisma.productMaterial.findMany({
      where: {
        active: true,
        ...(storeId ? { storeId } : {}),
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<ProductMaterial> {
    const material = await this.prisma.productMaterial.findFirst({
      where: { id, active: true },
    });

    if (!material) {
      throw new NotFoundException('Product material not found');
    }

    return material;
  }

  async update(
    id: string,
    data: UpdateProductMaterialDto,
  ): Promise<ProductMaterial> {
    await this.findOne(id);

    return this.prisma.productMaterial.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.productMaterial.update({
      where: { id },
      data: { active: false },
    });
  }
}
