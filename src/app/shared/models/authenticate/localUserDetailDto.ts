export interface LocalUserDetailDto {
    localUserId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string | null;
    role: string;
    imageUrl: string | null;
    address: string | null;
    ward: string | null;
    district: string | null;
    city: string | null;
    // orderDtos: OrderDto[];
}