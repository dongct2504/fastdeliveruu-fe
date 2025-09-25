import { MenuItemSortConstants } from "../../common/menuItemSortConstants";

export class MenuItemParams {
    genreId: string | null = '';
    restaurantId: string | null = '';
    sort: string = MenuItemSortConstants.latestUpdateDesc;
    search: string = '';
    pageNumber: number = 1;
    pageSize: number = 1;
}