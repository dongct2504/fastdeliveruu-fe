export interface UpdateUserRequest {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    address: string | null;
    wardId: string | null;
    districtId: string | null;
    cityId: string | null;
    role: string | null;
}
