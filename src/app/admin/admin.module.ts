import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { UserListComponent } from './users/pages/user-list.component';
import { UserEditComponent } from './users/pages/user-edit/user-edit.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        AdminLayoutComponent,
        UserListComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule { }
