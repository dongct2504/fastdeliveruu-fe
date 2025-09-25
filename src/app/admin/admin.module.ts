import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { UserListComponent } from './users/pages/user-list.component';
import { UserEditComponent } from './users/pages/user-edit/user-edit.component';
import { SharedModule } from "../shared/shared.module";
import { RestaurantListComponent } from './restaurants/pages/restaurant-list.component';
import { RestaurantEditComponent } from './restaurants/pages/restaurant-edit/restaurant-edit.component';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        UserListComponent,
        UserEditComponent,
        RestaurantListComponent,
        RestaurantEditComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
