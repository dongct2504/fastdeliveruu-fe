export interface MenuItemDto {
    menuItemId: string;
    name: string;
    description: string;
    inventory: number;
    price: number;
    discountPercent: number;
    discountAmount: number;
    discountPrice: number;
    imageUrl: string | null;
}