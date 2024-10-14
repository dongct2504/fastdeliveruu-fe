import { MenuItemDto } from "../menuItems/menuItemDto";
import { MenuVariantDto } from "../menuItems/menuVariantDto";

export interface OrderDetailDto {
    id: string;
    menuItemId: string;
    menuVariantId: string,
    orderId: string;
    price: number;
    quantity: number;
    menuItemDto: MenuItemDto
    menuVariantDto: MenuVariantDto
}