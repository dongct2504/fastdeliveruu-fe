import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { InternalServerErrorComponent } from './core/internal-server-error/internal-server-error.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: 'internal-server-error', component: InternalServerErrorComponent
  },
  {
    path: 'authen',
    loadChildren: () => import('./authenticate/authenticate.module').then(mod => mod.AuthenticateModule)
  },
  {
    path: 'menu-items',
    loadChildren: () => import('./menu-items/menu-items.module').then(mod => mod.MenuItemsModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.module').then(mod => mod.RestaurantsModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'carts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./customer-cart/customer-cart.module').then(mod => mod.CustomerCartModule)
  },
  {
    path: 'checkout',
    canActivate: [AuthGuard],
    loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule)
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule)
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
