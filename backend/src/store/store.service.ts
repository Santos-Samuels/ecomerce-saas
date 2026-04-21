import { StorePermission } from '@ecomerce/shared';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStoreDto): Promise<Store> {
    const { permissions, ...rest } = data;

    const created = await this.prisma.store.create({
      data: {
        ...rest,
        ...(permissions && permissions.length
          ? {
              permissions: {
                create: permissions.map((code) => ({
                  permission: {
                    connect: { code },
                  },
                })),
              },
            }
          : {}),
      },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });

    return this.mapStore(created);
  }

  async findAll(): Promise<Store[]> {
    const stores = await this.prisma.store.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return stores.map((s) => this.mapStore(s));
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return this.mapStore(store);
  }

  async findPublicInfo(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return this.mapStore(store);
  }

  async update(id: string, data: UpdateStoreDto): Promise<Store> {
    await this.findOne(id);

    const { permissions, ...rest } = data;

    if (permissions) {
      await this.prisma.storePermission.deleteMany({
        where: { storeId: id },
      });
    }

    const updated = await this.prisma.store.update({
      where: { id },
      data: {
        ...rest,
        ...(permissions && permissions.length
          ? {
              permissions: {
                create: permissions.map((code) => ({
                  permission: {
                    connect: { code },
                  },
                })),
              },
            }
          : {}),
      },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });

    return this.mapStore(updated);
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

    const updated = await this.prisma.store.update({
      where: { id },
      data: { active: true, deletedAt: null },
      include: {
        permissions: {
          include: { permission: true },
        },
      },
    });

    return this.mapStore(updated);
  }

  private mapStore(db: any): Store {
    const permissionCodes: StorePermission[] | undefined = db.permissions
      ? db.permissions.map(
          (sp: { permission: { code: string } }) =>
            sp.permission.code as StorePermission,
        )
      : undefined;

    return {
      id: db.id,
      name: db.name,
      subdomain: db.subdomain,
      description: db.description,
      address: db.address,
      phone: db.phone,
      secondaryPhone: db.secondaryPhone,
      email: db.email,
      logoUrl: db.logoUrl,
      mapEmbedUrl: db.mapEmbedUrl,
      storefrontImageUrl: db.storefrontImageUrl,
      primaryColor: db.primaryColor,
      instagramHandle: db.instagramHandle,
      active: db.active,
      createdAt: db.createdAt,
      updatedAt: db.updatedAt,
      deletedAt: db.deletedAt,
      permissions: permissionCodes,
    };
  }
}
