import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard(false)],
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard(true)],
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'admin', component: AdminComponent,canActivate:[adminGuard] },
      {path:'profile/:username',component:ProfileComponent}
    ],
  },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
