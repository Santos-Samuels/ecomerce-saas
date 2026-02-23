import { IStore } from '@ecomerce/shared';

export class Store implements IStore {
  id: string;

  name: string;

  description?: string | null;

  address?: string | null;

  phone: string;

  email: string;

  logoUrl?: string | null;

  primaryColor?: string | null;

  active: boolean;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date | null;

  permissions?: string[];
}
