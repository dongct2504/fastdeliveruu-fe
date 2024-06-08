export interface RestaurantDto {
    restaurantId: string;
    name: string;
    description: string;
    imageUrl: string | null;
    address: string;
    ward: string;
    district: string;
    city: string;
}