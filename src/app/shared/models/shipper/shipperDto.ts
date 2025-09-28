export interface ShipperDto {
  id: string;
  firstName: string;
  lastName: string;
  citizenIdentification: string;
  userName: string;
  email: string;
  modelType?: string | null;
  imageUrl?: string | null;
  address: string;
  houseNumber: string;
  streetName: string;
  cityId: number;
  districtId: number;
  wardId: number;
  latitude?: number | null;
  longitude?: number | null;
}
