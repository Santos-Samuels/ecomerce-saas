import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import type ImageKit from 'imagekit';
import { IMAGEKIT } from './imagekit.provider';

export interface ImageKitAuthPayload {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
  uploadEndpoint: string;
}

@Injectable()
export class ImageKitService {
  constructor(@Inject(IMAGEKIT) private readonly imageKit: ImageKit | null) {}

  getAuthPayload(): ImageKitAuthPayload {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const uploadEndpoint =
      process.env.IMAGEKIT_UPLOAD_ENDPOINT ??
      'https://upload.imagekit.io/api/v1/files/upload';

    if (!publicKey || !this.imageKit) {
      throw new InternalServerErrorException(
        'Serviço de upload de imagens não está configurado',
      );
    }

    const { token, expire, signature } =
      this.imageKit.getAuthenticationParameters();

    return {
      token,
      expire,
      signature,
      publicKey,
      uploadEndpoint,
    };
  }
}
