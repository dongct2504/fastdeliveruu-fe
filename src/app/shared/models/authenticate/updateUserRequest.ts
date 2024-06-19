export interface UpdateUserRequest {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    address: string | null;
    ward: string | null;
    district: string | null;
    city: string | null;
    role: string | null;
}
