export interface AppUserDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    imageUrl: string | null;
    address: string | null;
    cityId?: number;
    districtId?: number;
    wardId?: number;
    latitude?: number;
    longitude?: number;
}