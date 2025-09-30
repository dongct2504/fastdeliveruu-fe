import { MenuItemDto } from "../menuItems/menuItemDto";

export interface GenreDetailDto {
    id: string;
    name: string;
    menuItemDtos: MenuItemDto[] | null;
}