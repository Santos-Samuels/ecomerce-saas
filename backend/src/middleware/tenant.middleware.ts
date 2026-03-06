import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../common/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const subdomain = this.extractSubdomain(req.headers.origin);

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

  private extractSubdomain(origin?: string): string | null {
    if (!origin) return null;
    
    const hostname = new URL(origin).hostname;
    const baseDomain = process.env.BASE_DOMAIN;
    
    if (!baseDomain) {
      throw new Error(
        'A variável de ambiente BASE_DOMAIN é obrigatória para o funcionamento do sistema.',
      );
    }

     const reservedSubdomains = process.env.RESERVED_SUBDOMAINS?.split(',') || [];

    // Se o hostname é o próprio BASE_DOMAIN, não há subdomínio
    if (hostname === baseDomain || reservedSubdomains.includes(hostname)) {
      return null;
    }

    // Se o hostname termina com .BASE_DOMAIN, extraímos o que vem antes
    if (hostname.endsWith(`.${baseDomain}`)) {
      return hostname.replace(`.${baseDomain}`, '');
    }

    return null;
  }
}
