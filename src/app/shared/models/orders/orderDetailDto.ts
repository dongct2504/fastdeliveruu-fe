import { MenuItemDto } from "../menuItems/menuItemDto";

export interface OrderDetailDto {
    menuItemId: string;
    orderId: string;
    price: number;
    quantity: number;
    menuItemDto: MenuItemDto
}