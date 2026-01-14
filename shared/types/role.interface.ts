export interface IRole {
  id: string;
  name: string; // e.g., 'admin', 'customer', 'staff'
  permissions: string[];
  active: boolean;
}
