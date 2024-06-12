import { MenuItemDto } from "../menuItems/menuItemDto";

export interface ShoppingCartDto {
    localUserId: string;
    menuItemId: string;
    quantity: number;
    menuItemDto: MenuItemDto | null;
}