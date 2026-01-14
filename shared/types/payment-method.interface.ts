export interface IPaymentMethod {
  id: string;
  name: string;
  type: string; // e.g., 'credit_card', 'pix', 'boleto'
  active: boolean;
  storeId: string;
  createdAt: Date;
  updatedAt?: Date;
}
