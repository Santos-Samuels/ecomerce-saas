import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryBatchDto } from './dto/create-gallery-batch.dto';
import { IGallery } from '@ecomerce/shared';

const MAX_GALLERY_IMAGES = 50;
const MAX_BATCH_SIZE = 10;

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async createBatch(
    storeId: string,
    dto: CreateGalleryBatchDto,
  ): Promise<IGallery[]> {
    const urls = [...new Set(dto.urls.map((u) => u.trim()).filter(Boolean))];
    if (urls.length === 0) {
      throw new BadRequestException('Nenhuma URL válida informada.');
    }
    if (urls.length > MAX_BATCH_SIZE) {
      throw new BadRequestException(
        `É possível enviar no máximo ${MAX_BATCH_SIZE} imagens por vez.`,
      );
    }

    const currentCount = await this.prisma.gallery.count({
      where: { storeId },
    });

    if (currentCount + urls.length > MAX_GALLERY_IMAGES) {
      throw new BadRequestException(
        `A galeria permite no máximo ${MAX_GALLERY_IMAGES} imagens. Você já possui ${currentCount} e está tentando adicionar ${urls.length}.`,
      );
    }

    return this.prisma.$transaction(
      urls.map((url) =>
        this.prisma.gallery.create({
          data: { storeId, url },
        }),
      ),
    );
  }

  async findAll(storeId: string): Promise<IGallery[]> {
    return this.prisma.gallery.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneForStore(storeId: string, id: string): Promise<IGallery> {
    const gallery = await this.prisma.gallery.findFirst({
      where: { id, storeId },
    });

    if (!gallery) {
      throw new NotFoundException(`Item da galeria não encontrado.`);
    }

    return gallery;
  }

  async remove(storeId: string, id: string): Promise<void> {
    await this.findOneForStore(storeId, id);
    await this.prisma.gallery.delete({
      where: { id },
    });
  }
}
