import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { Prisma } from '@prisma/client';

type PrismaProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    material: true;
    vehicles: true;
  };
}>;

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToEntity(prismaProduct: PrismaProductWithRelations): Product {
    return {
      ...prismaProduct,
      price: Number(prismaProduct.price),
      promotionalPrice: prismaProduct.promotionalPrice
        ? Number(prismaProduct.promotionalPrice)
        : undefined,
      compatibleVehicles: prismaProduct.vehicles || [], // Map vehicles relation
      // Ensure category and material are mapped correctly if included
      category: prismaProduct.category,
      material: prismaProduct.material,
    };
  }

  async create(data: CreateProductDto): Promise<Product> {
    if (
      data.promotionalPrice !== undefined &&
      data.promotionalPrice !== null &&
      data.promotionalPrice > data.price
    ) {
      throw new BadRequestException(
        'Promotional price cannot be greater than price',
      );
    }

    const existing = await this.prisma.product.findFirst({
      where: {
        storeId: data.storeId,
        OR: [{ slug: data.slug }, { sku: data.sku }],
      },
    });

    if (existing && existing.active) {
      throw new BadRequestException(
        'Product with this slug or SKU already exists',
      );
    }

    if (existing && !existing.active) {
      // Reactivate logic if needed, but simple create for now usually prefers clean slug
      // But let's check if we should update the inactive one
      // If slug matches, update. If SKU matches, update.
      // For simplicity, let's just create new if unique constraints allow, but constraints are on [storeId, slug] and [storeId, sku]
      // So we MUST update if it exists
      return this.mapToEntity(
        await this.prisma.product.update({
          where: { id: existing.id },
          data: {
            ...data,
            active: true,
          },
          include: {
            category: true,
            material: true,
            vehicles: true,
          },
        }),
      );
    }

    const created = await this.prisma.product.create({
      data: {
        ...data,
        active: data.active ?? true,
      },
      include: {
        category: true,
        material: true,
        vehicles: true,
      },
    });

    return this.mapToEntity(created);
  }

  async findAll(storeId?: string): Promise<Product[]> {
    const where: Prisma.ProductWhereInput = {
      active: true,
    };

    if (storeId) {
      where.storeId = storeId;
    }

    const products = await this.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        material: true,
        vehicles: true,
      },
    });

    return products.map((p) => this.mapToEntity(p));
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        material: true,
        vehicles: true,
      },
    });

    if (!product || !product.active) {
      throw new NotFoundException('Product not found');
    }

    return this.mapToEntity(product);
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const existing = await this.findOne(id);

    const price = data.price ?? existing.price;
    const promotionalPrice =
      data.promotionalPrice !== undefined
        ? data.promotionalPrice
        : existing.promotionalPrice;

    if (
      promotionalPrice !== undefined &&
      promotionalPrice !== null &&
      promotionalPrice > price
    ) {
      throw new BadRequestException(
        'Promotional price cannot be greater than price',
      );
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        material: true,
        vehicles: true,
      },
    });

    return this.mapToEntity(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.product.update({
      where: { id },
      data: { active: false },
    });
  }
}
