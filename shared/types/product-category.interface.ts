export interface IProductCategory {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string; // For subcategories
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
