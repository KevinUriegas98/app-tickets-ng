import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./tickets.component').then(m => m.TicketsComponent)
    }
    // {
    //   path: ':id',
    //   loadComponent: () => import('./pages/form/form.component')
    // }
  ];