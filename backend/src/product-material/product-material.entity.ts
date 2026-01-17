import { IProductMaterial } from '@ecomerce/shared';

export class ProductMaterial implements IProductMaterial {
  id: string;

  storeId: string;

  name: string;

  description?: string | null;

  colorName?: string | null;

  colorHex?: string | null;

  active: boolean;

  createdAt: Date;

  updatedAt?: Date;
}
