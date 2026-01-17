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

type PrismaProductRaw = Prisma.ProductGetPayload<Prisma.ProductDefaultArgs> & {
  category?: Product['category'];
  material?: Product['material'];
  vehicles?: Product['compatibleVehicles'];
};

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToEntity(prismaProduct: PrismaProductRaw): Product {
    return {
      ...prismaProduct,
      price: Number(prismaProduct.price),
      promotionalPrice: prismaProduct.promotionalPrice
        ? Number(prismaProduct.promotionalPrice)
        : undefined,
      infiniteStock: prismaProduct.infiniteStock,
      compatibleVehicles: prismaProduct.vehicles ?? [],
      category: prismaProduct.category,
      material: prismaProduct.material,
    };
  }

  async create(data: CreateProductDto): Promise<Product> {
    const { compatibleVehicleIds, ...rest } = data;

    if (
      rest.promotionalPrice !== undefined &&
      rest.promotionalPrice !== null &&
      rest.promotionalPrice > rest.price
    ) {
      throw new BadRequestException(
        'Promotional price cannot be greater than price',
      );
    }

    const existing = await this.prisma.product.findFirst({
      where: {
        storeId: rest.storeId,
        OR: [{ slug: rest.slug }, { sku: rest.sku }],
      },
    });

    if (existing && existing.active) {
      throw new BadRequestException(
        'Product with this slug or SKU already exists',
      );
    }

    if (existing && !existing.active) {
      return this.mapToEntity(
        await this.prisma.product.update({
          where: { id: existing.id },
          data: {
            ...rest,
            active: true,
            ...(compatibleVehicleIds !== undefined
              ? {
                  vehicles: {
                    set: compatibleVehicleIds.map((id) => ({ id })),
                  },
                }
              : {}),
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
        ...rest,
        active: rest.active ?? true,
        ...(compatibleVehicleIds && compatibleVehicleIds.length > 0
          ? {
              vehicles: {
                connect: compatibleVehicleIds.map((id) => ({ id })),
              },
            }
          : {}),
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

    const { compatibleVehicleIds, ...rest } = data;

    const price = rest.price ?? existing.price;
    const promotionalPrice =
      rest.promotionalPrice !== undefined
        ? rest.promotionalPrice
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
      data: {
        ...rest,
        ...(compatibleVehicleIds !== undefined
          ? {
              vehicles: {
                set: compatibleVehicleIds.map((vehicleId) => ({
                  id: vehicleId,
                })),
              },
            }
          : {}),
      },
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
