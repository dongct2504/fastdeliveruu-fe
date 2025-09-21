import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
