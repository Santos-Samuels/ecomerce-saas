import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthTokenPayload } from './auth.types';
import * as crypto from 'crypto';
import { IUser } from '@ecomerce/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<{ accessToken: string; user: IUser }> {
    const user = await this.validateUser(data.email, data.password);
    const payload: AuthTokenPayload = {
      sub: user.id,
      email: user.email,
      storeId: user.storeId,
      roleId: user.roleId,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user: this.toAuthUser(user) };
  }

  async getProfile(userId: string): Promise<IUser> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, active: true },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.toAuthUser(user);
  }

  private async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, active: true },
      include: { role: true },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordHash = this.hashPassword(password);

    if (user.passwordHash !== passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private toAuthUser(user): IUser {
    return {
      id: user.id,
      storeId: user.storeId,
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      phone: user.phone,
      address: user.address ?? undefined,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? undefined,
      role: user.role,
    };
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
