import { IProductCategory } from '@ecomerce/shared';

export class ProductCategory implements IProductCategory {
  id: string;

  storeId: string;

  name: string;

  slug: string;

  description?: string | null;

  parentId?: string | null;

  active: boolean;

  createdAt: Date;

  updatedAt?: Date;
}
