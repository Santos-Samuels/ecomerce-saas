import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../common/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const host = req.headers.host;
    const subdomain = this.extractSubdomain(host);

    if (subdomain) {
      const store = await this.prisma.store.findUnique({
        where: { subdomain, active: true },
      });

      if (store) {
        req.tenantId = store.id;
      }
    }

    next();
  }

  private extractSubdomain(host?: string): string | null {
    if (!host) return null;

    const hostname = host.split(':')[0];
    const baseDomain = process.env.BASE_DOMAIN;

    if (!baseDomain) {
      throw new Error(
        'A variável de ambiente BASE_DOMAIN é obrigatória para o funcionamento do sistema.',
      );
    }

    // Se o hostname é o próprio BASE_DOMAIN, não há subdomínio
    if (hostname === baseDomain) {
      return null;
    }

    // Se o hostname termina com .BASE_DOMAIN, extraímos o que vem antes
    if (hostname.endsWith(`.${baseDomain}`)) {
      return hostname.replace(`.${baseDomain}`, '');
    }

    return null;
  }
}
