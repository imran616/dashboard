import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/auth/login/login.component';
export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
