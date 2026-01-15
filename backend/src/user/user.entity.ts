import { IUser } from '@ecomerce/shared';

export class User implements IUser {
  id: string;

  storeId: string;

  name: string;

  email: string;

  passwordHash?: string | null;

  roleId: string;

  phone: string;

  address?: string | null;

  active: boolean;

  createdAt: Date;

  updatedAt?: Date;
}
