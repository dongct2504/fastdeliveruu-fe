import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from './menu-items.service';
import { MenuItemDto } from '../shared/models/menuItems/menuItemDto';
import { GenreDto } from '../shared/models/genres/genreDto';
import { MenuItemParams } from '../shared/models/menuItems/menuItemParams';
import { MenuItemSortConstants } from '../shared/common/menuItemSortConstants';
import { FormGroup } from '@angular/forms';
import { PageSizeConstants } from '../shared/common/pageSizeConstants';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItemDto[] = [];
  genres: GenreDto[] = [];

  menuItemParams = new MenuItemParams();
  totalRecords = 0;
  itemsPerPage = 0;

  searchForm = {} as FormGroup;

  sortOptions = [
    { name: 'Mới cập nhật', value: MenuItemSortConstants.latestUpdateDesc },
    { name: 'Giá từ thấp đến cao', value: MenuItemSortConstants.priceAsc },
    { name: 'Giá từ cao đến thấp', value: MenuItemSortConstants.priceDesc },
    { name: 'Tên (a-z)', value: MenuItemSortConstants.name }
  ];

  constructor(private menuItemsService: MenuItemsService) {
    this.menuItemParams.pageSize = PageSizeConstants.pageSize9;
  }

  ngOnInit(): void {
    this.getMenuItems();
    this.getGenres();
  }

  private getMenuItems() {
    this.menuItemsService.getMenuItems(this.menuItemParams).subscribe(pagedList => {
      this.menuItems = pagedList.items;
      this.menuItemParams.pageNumber = pagedList.pageNumber;
      this.itemsPerPage = pagedList.pageSize;
      this.totalRecords = pagedList.totalRecords;
    });
  }

  private getGenres() {
    this.menuItemsService.getGenres().subscribe(genres => {
      this.genres = [{ genreId: '', name: 'Tất cả' }, ...genres]
    });
  }

  onGenreSelected(genreId: string) {
    this.menuItemParams.genreId = genreId;
    this.menuItemParams.pageNumber = 1;
    this.getMenuItems();
  }

  onSortSelected(sort: string) {
    this.menuItemParams.sort = sort;
    this.getMenuItems();
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