export interface IProductCategory {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null; // For subcategories
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
