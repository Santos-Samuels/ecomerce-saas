import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleById } from '@ecomerce/shared';
import { ROLES_KEY } from './roles.decorator';
import { AuthTokenPayload } from './auth.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleById[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: AuthTokenPayload }>();
    
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return requiredRoles.some((role) => user.roleId === role);
  }
}
