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

    // Remove port if present
    const hostname = host.split(':')[0];

    const parts = hostname.split('.');

    // localhost case: foo.localhost -> foo
    if (hostname.endsWith('localhost') && parts.length === 2) {
      return parts[0];
    }

    // domain case: foo.domain.com -> foo
    if (parts.length >= 3) {
      return parts[0];
    }

    return null;
  }
}
