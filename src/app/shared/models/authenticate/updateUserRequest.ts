export interface UpdateUserRequest {
    id: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string;
    houseNumber: string | null;
    streetName: string | null;
    wardId: string | null;
    districtId: string | null;
    cityId: string | null;
    role: string | null;
}
