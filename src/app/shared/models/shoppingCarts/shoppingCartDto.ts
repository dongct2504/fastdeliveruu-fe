import { MenuItemDto } from "../menuItems/menuItemDto";

export interface ShoppingCartDto {
    id: string
    appUserId: string;
    menuItemId: string;
    menuVariantId?: string | null;
    quantity: number;
    menuItemDto: MenuItemDto;
}