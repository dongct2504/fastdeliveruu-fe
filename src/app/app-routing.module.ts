import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorsComponent } from './core/test-errors/test-errors.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { InternalServerErrorComponent } from './core/internal-server-error/internal-server-error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test-errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },
  {
    path: 'menu-items',
    loadChildren: () => import('./menu-items/menu-items.module').then(mod => mod.MenuItemsModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then(mod => mod.RestaurantsModule)
  },
  {
    path: 'contact', 
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule)
   },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
