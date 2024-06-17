export interface DeliveryMethodDto {
    deliveryMethodId: string;
    shortName: string;
    deliveryTime: string | null;
    description: string;
    price: number;
}