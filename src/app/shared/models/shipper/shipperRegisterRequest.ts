export interface ShipperRegisterRequest {
  firstName: string;
  lastName: string;
  citizenIdentification: string;
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  houseNumber: string;
  streetName: string;
  cityId: number;
  districtId: number;
  wardId: number;
  modelType?: string | null;
}
