import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      try {
        const { hostname } = new URL(origin);
        const baseDomain = process.env.BASE_DOMAIN;

        const isRoot = hostname === baseDomain;
        const isSubdomain = hostname.endsWith(`.${baseDomain}`);

        if (isRoot || isSubdomain) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
      } catch {
        return callback(new Error('Invalid origin'));
      }
    },
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
void bootstrap();
