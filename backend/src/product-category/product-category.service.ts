import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductCategoryDto): Promise<ProductCategory> {
    const existing = await this.prisma.productCategory.findFirst({
      where: {
        storeId: data.storeId,
        slug: data.slug,
      },
    });

    if (existing && existing.active) {
      throw new BadRequestException('Product category already exists');
    }

    if (existing && !existing.active) {
      return this.prisma.productCategory.update({
        where: { id: existing.id },
        data: {
          name: data.name,
          description: data.description,
          parentId: data.parentId,
          active: true,
        },
      });
    }

    return this.prisma.productCategory.create({
      data,
    });
  }

  async findAll(storeId: string): Promise<ProductCategory[]> {
    return this.prisma.productCategory.findMany({
      where: {
        active: true,
        storeId,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<ProductCategory> {
    const category = await this.prisma.productCategory.findFirst({
      where: { id, active: true },
    });

    if (!category) {
      throw new NotFoundException('Product category not found');
    }

    return category;
  }

  async update(
    id: string,
    data: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    await this.findOne(id);

    return this.prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.productCategory.update({
      where: { id },
      data: { active: false },
    });
  }
}
