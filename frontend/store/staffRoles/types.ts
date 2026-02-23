import { StaffRoleRow } from "@/components/staff/roles/RolesTable";

export interface StaffRolesState {
  items: StaffRoleRow[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveStaffRolePayload {
  id?: string;
  name: string;
  permissions: string[];
}

export interface DeleteStaffRolePayload {
  id: string;
}

