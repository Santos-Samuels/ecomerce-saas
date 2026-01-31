import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeVehicleData<T extends { make?: string; model?: string }>(
    data: T,
  ): T {
    const normalized: T = { ...data };

    if (normalized.make !== undefined && normalized.make !== null) {
      normalized.make = normalized.make.trim().toUpperCase();
    }

    if (normalized.model !== undefined && normalized.model !== null) {
      normalized.model = normalized.model.trim().toUpperCase();
    }

    return normalized;
  }

  async create(data: CreateVehicleDto): Promise<Vehicle> {
    const normalizedData = this.normalizeVehicleData(data);

    return this.prisma.vehicle.create({
      data: {
        ...normalizedData,
        active: normalizedData.active ?? true,
      },
    });
  }

  async findAll(): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      where: {
        active: true,
      },
      orderBy: {
        make: 'asc',
      },
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle || !vehicle.active) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  async update(id: string, data: UpdateVehicleDto): Promise<Vehicle> {
    await this.findOne(id);

    const normalizedData = this.normalizeVehicleData(data);

    return this.prisma.vehicle.update({
      where: { id },
      data: normalizedData,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.vehicle.update({
      where: { id },
      data: { active: false },
    });
  }
}
