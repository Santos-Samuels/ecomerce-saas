import { IRole, IUser, RoleById } from '@ecomerce/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role as PrismaRole, User as PrismaUser } from '@prisma/client';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AuthTokenPayload } from './auth.types';
import { LoginDto } from './dto/login.dto';

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
      roleName: user.role.name as RoleById,
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

  private toAuthUser(user: PrismaUser & { role?: PrismaRole | null }): IUser {
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
      role: this.mapRole(user.role),
    };
  }

  private mapRole(role: PrismaRole | null | undefined): IRole | undefined {
    if (!role) {
      return undefined;
    }

    return {
      id: role.id,
      name: role.name,
      permissions: role.permissions,
      active: role.active,
    };
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
