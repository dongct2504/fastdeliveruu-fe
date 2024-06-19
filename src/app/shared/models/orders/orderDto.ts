export interface OrderDto {
    orderId: string;
    firstName: string;
    lastName: string;
    orderDate: string | null;
    phoneNumber: string;
    totalAmount: number;
    deliveryMethodShortName: string;
    shippingPrice: string;
    orderStatus: string | null;
    paymentStatus: string | null;
    paymentMethod: string | null;
    transactionId: string | null;
    address: string;
    ward: string;
    district: string;
    city: string;
}