import { DeliveryPersonStatus, VehicleType } from "@prisma/client";

export interface AddressDTO {
  id: string;
  street: string;
  number: string;
  neighborhood: string | null;
  complement: string | null;
  reference: string | null;
  city: string;
  state: string;
}

export interface UserDTO {
  name: string;
  email: string;
  phone: string | null;

  addresses: AddressDTO[];
}

export interface DeliveryPersonDTO {
  id: string;
  document: string;
  documentImageUrl: string | null;
  isOnline: boolean;
  notes: string | null;
  rating: number | null;
  ratingCount: number;
  status: DeliveryPersonStatus;
  vehiclePlate: string | null;
  vehicleType: VehicleType | null;
  createdAt: Date;
  updatedAt: Date;
  user: UserDTO;
}
