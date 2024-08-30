import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./sistemas.component').then(m => m.SistemasComponent)
    }
];