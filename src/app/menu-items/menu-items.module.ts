import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MenuItemsRoutingModule } from './menu-items-routing.module';
import { MenuItemsComponent } from './pages/menu-items.component';
import { MenuItemDetailsComponent } from './pages/menu-item-details/menu-item-details.component';

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
