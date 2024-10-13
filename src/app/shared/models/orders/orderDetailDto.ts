import { MenuItemDto } from "../menuItems/menuItemDto";

export interface OrderDetailDto {
    id: string;
    menuItemId: string;
    orderId: string;
    price: number;
    quantity: number;
    menuItemDto: MenuItemDto
}