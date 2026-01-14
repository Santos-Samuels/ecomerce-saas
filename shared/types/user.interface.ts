import { IRole } from './role.interface';

export interface IUser {
  id: string;
  storeId: string;
  name: string;
  email: string;
  passwordHash?: string; // Optional if not returned to frontend
  roleId: string;
  role?: IRole;
  phone: string;
  address?: string; // Could be a separate interface IAddress
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
