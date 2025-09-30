import { Component, OnInit } from '@angular/core';
import { faAdd, faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MenuItemDto } from 'src/app/shared/models/menuItems/menuItemDto';
import { AdminMenuItemService } from '../services/admin-menu-item.service';
import { Router } from '@angular/router';
import { MenuItemParams } from 'src/app/shared/models/menuItems/menuItemParams';
import { PagedList } from 'src/app/shared/models/PagedList';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.css']
})
export class MenuItemListComponent implements OnInit {
  faAdd = faAdd;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;

  menuItems: MenuItemDto[] = [];
  itemsPerPage = 10;
  totalRecords = 0;
  pageNumber = 1;

  params: MenuItemParams = {
    pageNumber: this.pageNumber,
    pageSize: this.itemsPerPage,
    genreId: null,
    restaurantId: null,
    sort: '',
    search: ''
  };

  constructor(
    private menuItemService: AdminMenuItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuItemService.getAll(this.params).subscribe({
      next: (response: PagedList<MenuItemDto>) => {
        this.menuItems = response.items;
        this.totalRecords = response.totalRecords;
      }
    });
  }

  onSearch(): void {
    this.params.pageNumber = 1;
    this.loadMenuItems();
  }

  onPageChanged(page: number) {
    this.params.pageNumber = page;
    this.loadMenuItems();
  }

  editMenuItem(id: string) {
    this.router.navigate(['/admin/menu-items/update', id]);
  }

  deleteMenuItem(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
      this.menuItemService.delete(id).subscribe({
        next: () => {
          this.loadMenuItems();
        }
      });
    }
  }
}
