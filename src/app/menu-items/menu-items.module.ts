import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MenuItemsComponent } from './menu-items.component';
import { MenuItemDetailsComponent } from './menu-item-details/menu-item-details.component';
import { MenuItemsRoutingModule } from './menu-items-routing.module';

@NgModule({
  declarations: [
    MenuItemsComponent,
    MenuItemDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    MenuItemsRoutingModule
  ]
})
export class MenuItemsModule { }
