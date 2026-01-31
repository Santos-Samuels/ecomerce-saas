import { IVehicle } from '@ecomerce/shared';

export class Vehicle implements IVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
