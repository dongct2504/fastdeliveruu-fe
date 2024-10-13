export interface RegisterRequest {
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    address: string | null;
    wardId: string | null;
    districtId: string | null;
    cityId: string | null;
    role: string | null;
}