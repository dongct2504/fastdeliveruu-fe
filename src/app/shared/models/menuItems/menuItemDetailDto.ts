import { GenreDto } from "../genres/genreDto";
import { RestaurantDto } from "../restaurants/restaurantDto";

export interface MenuItemDetailDto {
    id: string;
    name: string;
    description: string;
    inventory: number;
    price: number;
    discountPercent: number;
    discountAmount: number;
    discountPrice: number;
    imageUrl: string;
    genreDto: GenreDto | null;
    restaurantDto: RestaurantDto | null;
}