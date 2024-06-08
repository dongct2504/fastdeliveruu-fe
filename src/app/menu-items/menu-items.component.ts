import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from './menu-items.service';
import { MenuItemDto } from '../shared/models/menuItems/menuItemDto';
import { GenreDto } from '../shared/models/genres/genreDto';
import { MenuItemParams } from '../shared/models/menuItems/menuItemParams';
import { MenuItemSortConstants } from '../shared/common/menuItemSortConstants';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  faSearch = faSearch;

  menuItems: MenuItemDto[] = [];
  genres: GenreDto[] = [];

  menuItemParam = new MenuItemParams();
  totalRecords = 0;
  itemsPerPage = 0;

  searchForm = {} as FormGroup;

  sortOptions = [
    { name: 'Mới cập nhật', value: MenuItemSortConstants.latestUpdateDesc },
    { name: 'Giá từ thấp đến cao', value: MenuItemSortConstants.priceAsc },
    { name: 'Giá từ cao đến thấp', value: MenuItemSortConstants.priceDesc },
    { name: 'Tên (a-z)', value: MenuItemSortConstants.name }
  ];

  constructor(private menuItemsService: MenuItemsService, private fb: FormBuilder) {
    this.initSearchForm();
  }

  ngOnInit(): void {
    this.getMenuItems();
    this.getGenres();
  }

  private getMenuItems() {
    this.menuItemsService.getMenuItems(this.menuItemParam).subscribe(pagedList => {
      this.menuItems = pagedList.items;
      this.menuItemParam.page = pagedList.pageNumber;
      this.itemsPerPage = pagedList.pageSize;
      this.totalRecords = pagedList.totalRecords;
    });
  }

  private getGenres() {
    this.menuItemsService.getGenres().subscribe(genres => {
      this.genres = [{ genreId: '', name: 'Tất cả' }, ...genres]
    });
  }

  private initSearchForm() {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  onGenreSelected(genreId: string) {
    this.menuItemParam.genreId = genreId;
    this.menuItemParam.page = 1;
    this.getMenuItems();
  }

  onSortSelected(sort: string) {
    this.menuItemParam.sort = sort;
    this.getMenuItems();
  }

  onPageChanged(event: any) {
    if (this.menuItemParam.page !== event) {
      this.menuItemParam.page = event;
      this.getMenuItems();
    }
  }

  onSearchSubmit() {
    this.menuItemParam.search = this.searchForm.get('searchTerm')?.value;
    this.menuItemParam.page = 1;
    this.getMenuItems();
  }
}