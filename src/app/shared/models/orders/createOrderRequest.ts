export interface CreateOrderRequest {
    deliveryMethodId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    paymentMethod: string;
    address: string;
    ward: string;
    district: string;
    city: string;
}