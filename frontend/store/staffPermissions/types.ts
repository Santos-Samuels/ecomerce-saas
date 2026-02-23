import { PermissionRow } from "@/components/staff/permissions/PermissionsTable";

export interface StaffPermissionsState {
  items: PermissionRow[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveStaffPermissionPayload {
  id?: string;
  code: string;
  name: string;
  description?: string;
}

export interface DeleteStaffPermissionPayload {
  id: string;
}

