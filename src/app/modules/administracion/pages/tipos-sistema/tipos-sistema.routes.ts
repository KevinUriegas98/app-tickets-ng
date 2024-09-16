import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./tipos-sistema.component').then(m => m.TiposSistemaComponent)
    }
];