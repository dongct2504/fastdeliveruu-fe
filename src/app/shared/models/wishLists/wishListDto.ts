import { MenuItemDto } from "../menuItems/menuItemDto";
import { MenuVariantDto } from "../menuItems/menuVariantDto";

export interface WishListDto {
    id: string
    appUserId: string;
    menuItemId: string;
    menuVariantId?: string | null;
    menuItemDto: MenuItemDto;
    menuVariantDto?: MenuVariantDto | null;
}