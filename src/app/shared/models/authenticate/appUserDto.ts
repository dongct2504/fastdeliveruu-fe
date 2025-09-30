export interface AppUserDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    imageUrl: string | null;
    houseNumber: string;
    streetName: string;
    cityId: number;
    districtId: number;
    wardId: number;
    latitude: number;
    longitude: number;
    roles: string[];
}