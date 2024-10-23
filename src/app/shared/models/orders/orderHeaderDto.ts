import { DeliveryMethodDto } from "./deliveryMethodDto";
import { OrderDetailDto } from "./orderDetailDto";

export interface OrderHeaderDetailDto {
    id: string;
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
    houseNumber: string;
    streetName: string;
    cityId: number;
    districtId: number;
    wardId: number;
    latitude: number;
    longitude: number;
    deliveryMethodDto: DeliveryMethodDto;
    orderDetailDtos: OrderDetailDto[];
}