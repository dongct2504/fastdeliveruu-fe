export interface RegisterRequest {
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    address: string | null;
    ward: string | null;
    district: string | null;
    city: string | null;
    role: string | null;
}