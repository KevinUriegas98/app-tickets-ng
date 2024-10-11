import { Routes } from '@angular/router';
import { nameApp } from '@Constants';
import { AuthGuard } from '@Guards';
import { LoginComponent } from './modules/login/login.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';
import { ForbiddenComponent } from './layout/components/forbidden/forbidden.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: nameApp + 'LogIn'
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    data: { roles: ['Administrador', 'Usuario'] },
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    title: nameApp + 'Página Principal'
  },
  {
    path: 'administracion',
    canActivate: [AuthGuard],
    data: { roles: ['Administrador'] },
    loadChildren: () => import('./modules/administracion/administracion.routes').then(m => m.routes),
    title: nameApp + 'Administración'
  },
  {
    path: 'tickets',
    canActivate: [AuthGuard],
    data: { roles: ['Administrador', 'Usuario'] },
    loadChildren: () => import('./modules/tickets/tickets.routes').then(m => m.routes),
    title: nameApp + 'Tickets'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
