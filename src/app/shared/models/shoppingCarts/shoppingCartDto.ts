import { MenuItemDto } from "../menuItems/menuItemDto";
import { MenuVariantDtos } from "../menuItems/menuVariantDto";

export interface ShoppingCartDto {
    id: string
    appUserId: string;
    menuItemId: string;
    menuVariantId?: string | null;
    quantity: number;
    menuItemDto: MenuItemDto;
    menuVariantDto?: MenuVariantDtos | null;
}