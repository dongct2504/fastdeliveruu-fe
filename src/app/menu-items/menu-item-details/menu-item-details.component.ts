import { Component, Input, OnInit } from '@angular/core';
import { MenuItemsService } from '../menu-items.service';
import { MenuItemDetailDto } from 'src/app/shared/models/menuItems/menuItemDetailDto';
import { ActivatedRoute } from '@angular/router';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-item-details',
  templateUrl: './menu-item-details.component.html',
  styleUrls: ['./menu-item-details.component.css']
})
export class MenuItemDetailsComponent implements OnInit {
  menuItem?: MenuItemDetailDto;

  faMinusCircle = faMinusCircle;
  faPlusCircle = faPlusCircle;

  constructor(private menuItemsService: MenuItemsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getMenuItem();
  }

  private getMenuItem() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.menuItemsService.getMenuItem(id).subscribe(menuItem => {
      this.menuItem = menuItem;
    })
  }
}