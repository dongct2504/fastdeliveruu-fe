import { GenreDto } from "../genres/genreDto";
import { RestaurantDto } from "../restaurants/restaurantDto";
import { MenuVariantDtos } from "./menuVariantDto";

export interface MenuItemDetailDto {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPercent: number;
    discountAmount: number;
    discountPrice: number;
    imageUrl: string;
    genreDto: GenreDto | null;
    restaurantDto: RestaurantDto | null;
    menuVariantDtos: MenuVariantDtos[];
}