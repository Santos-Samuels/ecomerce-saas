import { IProductCategory } from "./product-category.interface";
import { IProductMaterial } from "./product-material.interface";
import { IVehicle } from "./vehicle.interface";

export interface IProductColor {
  name: string;
  hex: string;
}

export interface IProduct {
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
  colors?: IProductColor[];
  compatibleVehicles: IVehicle[];
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
