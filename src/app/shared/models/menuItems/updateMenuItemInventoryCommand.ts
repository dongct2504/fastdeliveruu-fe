export interface UpdateMenuItemInventoryCommand {
    id: string | null;
    menuItemId: string;
    quantityAvailable: number;
    quantityReserved: number;
}