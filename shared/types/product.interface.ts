import { IProductCategory } from './product-category.interface';
import { IProductMaterial } from './product-material.interface';
import { IVehicle } from './vehicle.interface';

export interface IProduct {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  stock: number;
  sku: string;
  images: string[];
  categoryId: string;
  category?: IProductCategory;
  materialId?: string;
  material?: IProductMaterial;
  compatibleVehicles: IVehicle[]; // Products compatible with specific vehicles
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
