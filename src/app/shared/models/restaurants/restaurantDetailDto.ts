import { RestaurantHourDto } from "./restaurantHourDto";

export interface RestaurantDetailDto {
    id: string;
    name: string;
    description: string;
    phoneNumber: string;
    imageUrl: string;
    address: string;
    cityId: number;
    districtId: number;
    wardId: number;
    // menuItemDtos: MenuItemDto[];
    restaurantHourDtos: RestaurantHourDto[];
}