import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { UserListComponent } from './users/pages/user-list.component';
import { UserEditComponent } from './users/pages/user-edit/user-edit.component';
import { SharedModule } from "../shared/shared.module";
import { RestaurantListComponent } from './restaurants/pages/restaurant-list.component';
import { RestaurantEditComponent } from './restaurants/pages/restaurant-edit/restaurant-edit.component';
import { GenreListComponent } from './genres/pages/genre-list.component';
import { GenreEditComponent } from './genres/pages/genre-edit/genre-edit.component';
import { MenuItemListComponent } from './menu-items/pages/menu-item-list.component';
import { MenuItemEditComponent } from './menu-items/pages/menu-item-edit/menu-item-edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        UserListComponent,
        UserEditComponent,
        RestaurantListComponent,
        RestaurantEditComponent,
        GenreListComponent,
        GenreEditComponent,
        MenuItemListComponent,
        MenuItemEditComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class AdminModule { }
