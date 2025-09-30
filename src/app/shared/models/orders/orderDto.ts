import { OrderStatusEnum } from "../../enums/order-status.enum";
import { PaymentMethodsEnum } from "../../enums/payment-methods.enum";

export interface OrderDto {
    id: string;
    firstName: string;
    lastName: string;
    orderDate: string | null;
    phoneNumber: string;
    totalAmount: number;
    deliveryMethodShortName: string;
    shippingPrice: string;
    orderStatus: OrderStatusEnum | null;
    paymentMethod: PaymentMethodsEnum | null;
    transactionId: string | null;
    houseNumber: string;
    streetName: string;
    cityId: number;
    districtId: number;
    wardId: number;
    latitude: number;
    longitude: number;
}