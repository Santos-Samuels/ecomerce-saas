import { Provider } from '@nestjs/common';
import ImageKit from 'imagekit';

export const IMAGEKIT = Symbol('IMAGEKIT');

export const imageKitProvider: Provider = {
  provide: IMAGEKIT,
  useFactory: () => {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      return null;
    }

    return new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  },
};
