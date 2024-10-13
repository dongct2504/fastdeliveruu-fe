import { MenuItemDto } from "../menuItems/menuItemDto";

export interface ShoppingCartDto {
    appUserId: string;
    menuItemId: string;
    quantity: number;
    menuItemDto: MenuItemDto;
}