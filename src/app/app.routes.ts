import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { LogIn } from './pages/log-in/log-in';
import { Register } from './pages/register/register';
import { Details } from './pages/details/details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'log-in',
    component: LogIn,
  },
  {
    path: 'register',
    component: Register,
  },

  {
    path: 'products/:id',
    component: Details,
  },
];
