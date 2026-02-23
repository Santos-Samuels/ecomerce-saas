export interface IRole {
  id: string;
  name: string; // e.g., 'admin', 'customer', 'staff'
  permissions: string[];
  active: boolean;
}

export enum RoleById {
  Admin = "admin",
  Customer = "customer",
  Staff = "staff",
}

export enum StorePermission {
  SHIPPING_MANAGE = "SHIPPING_MANAGE",
  PAYMENT_ENABLE = "PAYMENT_ENABLE",
  MATERIAL_MANAGE = "MATERIAL_MANAGE",
  VEHICLE_MANAGE = "VEHICLE_MANAGE",
  ORDER_MANAGE = "ORDER_MANAGE",
  PRODUCT_MANAGE = "PRODUCT_MANAGE",
  CATEGORY_MANAGE = "CATEGORY_MANAGE",
}
