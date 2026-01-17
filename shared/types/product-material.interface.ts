export interface IProductMaterial {
  id: string;
  storeId: string;
  name: string; // e.g., 'Couro', 'Tecido', 'Chinil'
  description?: string;
  colorName?: string;
  colorHex?: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
