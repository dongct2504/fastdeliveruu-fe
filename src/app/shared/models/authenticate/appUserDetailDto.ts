export interface AppUserDetailDto {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    dateOfBirth: string | null;
    role: string;
    imageUrl: string | null;
    address: string | null;
    cityId?: number;
    districtId?: number;
    wardId?: number;
    latitude?: number;
    longitude?: number;
    // orderDtos: OrderDto[];
}