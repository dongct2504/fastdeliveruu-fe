import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MenuItemsComponent } from './menu-items.component';
import { MenuItemCardComponent } from './menu-item-card/menu-item-card.component';

@NgModule({
  declarations: [
    MenuItemsComponent,
    MenuItemCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MenuItemsComponent,
  ]
})
export class MenuItemsModule { }
