import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./estatus-ticket.component').then(m => m.EstatusTicketComponent)
    }
  ];