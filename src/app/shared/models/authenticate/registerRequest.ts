export interface RegisterRequest {
    userName: string;
    phoneNumber: string;
    email: string;
    password: string;
    houseNumber: string | null;
    streetName: string | null;
    wardId: string | null;
    districtId: string | null;
    cityId: string | null;
    role: string | null;
}