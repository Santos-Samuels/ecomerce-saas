import { IRole } from './role.interface';

export interface IUser {
  id: string;
  storeId: string;
  name: string;
  email: string;
  passwordHash?: string | null; // Optional if not returned to frontend
  roleId: string;
  role?: IRole;
  phone: string;
  address?: string | null; // Could be a separate interface IAddress
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
