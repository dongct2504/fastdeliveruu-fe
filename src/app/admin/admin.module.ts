import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { UserListComponent } from './users/pages/user-list.component';
import { UserEditComponent } from './users/pages/user-edit/user-edit.component';
import { SharedModule } from "../shared/shared.module";
<<<<<<< HEAD
=======
import { RestaurantListComponent } from './restaurants/pages/restaurant-list.component';
import { RestaurantEditComponent } from './restaurants/pages/restaurant-edit/restaurant-edit.component';
import { GenreListComponent } from './genres/pages/genre-list.component';
import { GenreEditComponent } from './genres/pages/genre-edit/genre-edit.component';
import { MenuItemListComponent } from './menu-items/pages/menu-item-list.component';
import { MenuItemEditComponent } from './menu-items/pages/menu-item-edit/menu-item-edit.component';
import { FormsModule } from '@angular/forms';
>>>>>>> develop


@NgModule({
    declarations: [
        AdminLayoutComponent,
        UserListComponent,
<<<<<<< HEAD
        UserEditComponent
=======
        UserEditComponent,
        RestaurantListComponent,
        RestaurantEditComponent,
        GenreListComponent,
        GenreEditComponent,
        MenuItemListComponent,
        MenuItemEditComponent
>>>>>>> develop
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class AdminModule { }
