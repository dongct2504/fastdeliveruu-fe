import { RestaurantHourDto } from "./restaurantHourDto";

export interface RestaurantDetailDto {
    id: string;
    name: string;
    description: string;
    phoneNumber: string;
    imageUrl: string;
    houseNumber: string;
    streetName: string;
    cityId: number;
    districtId: number;
    wardId: number;
    latitude: number;
    longitude: number;
    // menuItemDtos: MenuItemDto[];
    restaurantHourDtos: RestaurantHourDto[];
}