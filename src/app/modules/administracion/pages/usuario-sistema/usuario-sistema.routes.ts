import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./usuario-sistema.component').then(m => m.UsuarioSistemaComponent)
    }
  ];