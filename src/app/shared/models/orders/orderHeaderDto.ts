import { DeliveryMethodDto } from "./deliveryMethodDto";
import { OrderDetailDto } from "./orderDetailDto";

export interface OrderHeaderDetailDto {
    orderId: string;
    firstName: string;
    lastName: string;
    orderDate: string;
    orderDescription: string;
    phoneNumber: string;
    totalAmount: number;
    trackingNumber: string | null;
    orderStatus: string | null;
    paymentStatus: string | null;
    paymentMethod: string | null;
    transactionId: string | null;
    address: string;
    ward: string;
    district: string;
    city: string;
    deliveryMethodDto: DeliveryMethodDto;
    orderDetailDtos: OrderDetailDto[];
}