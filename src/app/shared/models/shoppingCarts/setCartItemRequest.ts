export interface SetCartItemRequest {
    menuItemId: string;
    menuVariantId?: string | null;
    quantity: number;
}