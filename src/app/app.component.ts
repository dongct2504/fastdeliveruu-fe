import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItemDto } from './_models/menuItems/MenuItemDto';
import { PagedList } from './_models/menuItems/PagedList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FastDeliveruu';
  pagedList = {} as PagedList<MenuItemDto>;
  menuItems: MenuItemDto[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<PagedList<MenuItemDto>>('http://localhost:5000/api/v1/menu-items').subscribe((response) => {
      this.pagedList = response;
      this.menuItems = response.items;
    });
  }
}
