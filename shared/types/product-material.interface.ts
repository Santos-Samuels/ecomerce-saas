export interface IProductMaterial {
  id: string;
  storeId: string;
  name: string; // e.g., 'Couro', 'Tecido', 'Chinil'
  description?: string | null;
  colorName?: string | null;
  colorHex?: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
