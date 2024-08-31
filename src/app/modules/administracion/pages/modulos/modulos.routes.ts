import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modulos.component').then(m => m.ModulosComponent)
    }
];