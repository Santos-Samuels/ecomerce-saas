import { IStore, StorePermission } from '@ecomerce/shared';

export class Store implements IStore {
  id: string;

  name: string;

  subdomain?: string | null;

  description?: string | null;

  address?: string | null;

  phone: string;

  secondaryPhone?: string | null;

  email: string;

  logoUrl?: string | null;

  primaryColor?: string | null;

  active: boolean;

  createdAt: Date;

  updatedAt?: Date;

  deletedAt?: Date | null;

  permissions?: StorePermission[];
}
