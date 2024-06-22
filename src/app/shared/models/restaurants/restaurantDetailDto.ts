export interface RestaurantDetailDto {
    restaurantId: string;
    name: string;
    description: string;
    phoneNumber: string;
    imageUrl: string;
    address: string;
    ward: string;
    district: string;
    city: string;
    // menuItemDtos: MenuItemDto[];
}