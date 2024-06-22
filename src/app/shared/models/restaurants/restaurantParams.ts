import { MenuItemSortConstants } from "../../common/menuItemSortConstants";

export class RestaurantParams {
    sort: string = MenuItemSortConstants.latestUpdateDesc;
    search: string = '';
    pageNumber: number = 1;
    pageSize: number = 1;
}