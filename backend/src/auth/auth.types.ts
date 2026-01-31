import { RoleById } from '@ecomerce/shared';

export interface AuthTokenPayload {
  sub: string;
  email: string;
  storeId: string;
  roleId: string;
  roleName: RoleById;
}
