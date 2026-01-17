import { IVehicle } from "@ecomerce/shared";

export interface VehiclesState {
  items: IVehicle[];
  loading: boolean;
  saving: boolean;
  deletingId?: string;
}

export interface SaveVehiclePayload extends Partial<IVehicle> {
  onSuccess?: () => void;
}

export interface DeleteVehiclePayload {
  id: string;
}
