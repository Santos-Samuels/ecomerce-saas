import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreFeedbackDto } from './dto/create-store-feedback.dto';
import { UpdateStoreFeedbackDto } from './dto/update-store-feedback.dto';

@Injectable()
export class StoreFeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(createStoreFeedbackDto: CreateStoreFeedbackDto) {
    const { storeId } = createStoreFeedbackDto;

    const count = await this.prisma.storeFeedback.count({
      where: { storeId },
    });

    if (count >= 10) {
      throw new BadRequestException(
        'Limite de 10 feedbacks atingido para esta loja.',
      );
    }

    return this.prisma.storeFeedback.create({
      data: {
        ...createStoreFeedbackDto,
        stars: createStoreFeedbackDto.stars ?? 5,
      },
    });
  }

  async findAll(storeId: string) {
    return this.prisma.storeFeedback.findMany({
      where: { storeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.storeFeedback.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateStoreFeedbackDto: UpdateStoreFeedbackDto) {
    return this.prisma.storeFeedback.update({
      where: { id },
      data: updateStoreFeedbackDto,
    });
  }

  async remove(id: string) {
    return this.prisma.storeFeedback.delete({
      where: { id },
    });
  }
}
