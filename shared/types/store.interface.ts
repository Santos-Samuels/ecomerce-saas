export interface IStore {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone: string;
  email: string;
  logoUrl?: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
