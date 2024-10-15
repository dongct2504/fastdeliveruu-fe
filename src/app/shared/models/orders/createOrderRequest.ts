import { PaymentMethodsEnum } from "../../enums/payment-methods.enum";

export interface CreateOrderRequest {
    deliveryMethodId: number;
    firstName: string;
    lastName: string;
    // phoneNumber: string;
    paymentMethod: PaymentMethodsEnum;
    address: string;
    wardId: number;
    districtId: number;
    cityId: number;
}