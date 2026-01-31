import { SetMetadata } from '@nestjs/common';
import { RoleById } from '@ecomerce/shared';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleById[]) => SetMetadata(ROLES_KEY, roles);
