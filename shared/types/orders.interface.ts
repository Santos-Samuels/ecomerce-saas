import { IUser } from './user.interface';
import { IPaymentMethod } from './payment-method.interface';

export interface IOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface IOrders {
  id: string;
  storeId: string;
  userId: string;
  user?: IUser;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethodId?: string;
  paymentMethod?: IPaymentMethod;
  shippingAddress: string;
  active: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
