export interface IStore {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  phone: string;
  email: string;
  logoUrl?: string | null;
  primaryColor?: string | null;
  instagramHandle?: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
