export interface IVehicle {
  id: string;
  make: string; // e.g., 'Volvo', 'Scania', 'Mercedes'
  model: string; // e.g., 'FH', 'R450'
  year: number;
  type: string; // e.g., 'Truck', 'Bus'
  active: boolean;
}
