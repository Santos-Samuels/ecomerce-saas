import {
  IProduct,
  IProductCategory,
  IProductMaterial,
  IVehicle,
} from '@ecomerce/shared';

export class Product implements IProduct {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  stock: number;
  infiniteStock: boolean;
  sku: string;
  images: string[];
  categoryId: string;
  category?: IProductCategory;
  materialId?: string | null;
  material?: IProductMaterial | null;
  compatibleVehicles: IVehicle[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
