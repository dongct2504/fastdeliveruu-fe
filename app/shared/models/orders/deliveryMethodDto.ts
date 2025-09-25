export interface DeliveryMethodDto {
    id: string;
    shortName: string;
    deliveryTime: string | null;
    description: string;
    price: number;
}