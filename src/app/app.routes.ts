import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { NotFoundComponent } from './layout/components/not-found/not-found.component';
import { nameApp } from '@Constants';
import { AuthGuard } from '@Guards';

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
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    title: nameApp + 'Página Principal'
  },
  {
    path: 'administracion',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/administracion/administracion.routes').then(m => m.routes),
    title: nameApp + 'Administración'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
