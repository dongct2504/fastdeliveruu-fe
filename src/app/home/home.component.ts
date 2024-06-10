import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from 'src/app/menu-items/menu-items.service';
import { MenuItemDto } from 'src/app/shared/models/menuItems/menuItemDto';
import { MenuItemParams } from 'src/app/shared/models/menuItems/menuItemParams';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuItems?: MenuItemDto[];
  popularMenuItem?: MenuItemDto[];

  menuItemParams = new MenuItemParams();
  totalRecords = 0;
  itemsPerPage = 0;

  constructor(private menuItemsService: MenuItemsService) {
    this.menuItemParams.pageSize = PageSizeConstants.pageSize12;
  }

  ngOnInit(): void {
    this.getMenuItems();
  }

  private getMenuItems() {
    this.menuItemsService.getMenuItems(this.menuItemParams).subscribe(pagedList => {
      this.menuItems = pagedList.items;
      this.menuItemParams.pageNumber = pagedList.pageNumber;
      this.totalRecords = pagedList.totalRecords;
      this.itemsPerPage = pagedList.pageSize;

      this.getPopularMenuItems(this.menuItems);
    });
  }

  private getPopularMenuItems(menuItems: MenuItemDto[]) {
    this.popularMenuItem = [];
    for (let i = 0; i < 4; i++) {
      let randomNum = this.getRandomInteger(0, menuItems.length - 1);
      this.popularMenuItem.push(menuItems[randomNum]);
    }
  }

  private getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onPageChanged(event: any) {
    if (this.menuItemParams.pageNumber !== event) {
      this.menuItemParams.pageNumber = event;
      this.getMenuItems();
    }
  }

  onSearchSubmit(event: any) {
    this.menuItemParams.search = event;
    this.menuItemParams.pageNumber = 1;
    this.getMenuItems();
  }
}
