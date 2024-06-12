export interface LocalUserDto {
    localUserId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    imageUrl: string | null;
    address: string | null;
    ward: string | null;
    district: string | null;
    city: string | null;
}