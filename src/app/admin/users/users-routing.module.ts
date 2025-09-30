import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: UserEditComponent },
  { path: 'update/:id', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
