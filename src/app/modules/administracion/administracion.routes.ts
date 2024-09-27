import { Routes } from '@angular/router';
import { LayoutComponent } from '@Component/Layout';
import { nameApp } from '@Constants';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo:'personas',
                pathMatch:'full'
            },
            {
                path:'estatus-tickets',
                loadChildren: () => import('./pages/estatus-ticket/estatus-ticket.routes').then(m => m.routes),
                title: nameApp + 'Estatus Tickets'
            },
            {
                path: 'sistemas',
                loadChildren: () => import('./pages/sistemas/sistemas.routes').then(m => m.routes),
                title: nameApp + 'Sistemas'
            },
            {
                path: 'modulos',
                loadChildren: () => import('./pages/modulos/modulos.routes').then(m => m.routes),
                title: nameApp + 'Módulos'
            },
            {
                path: 'tipos',
                loadChildren: () => import('./pages/tipos/tipos.routes').then(m => m.routes),
                title: nameApp + 'Tipos'
            },
            {
                path: 'tipos-sistema',
                loadChildren: () => import('./pages/tipos-sistema/tipos-sistema.routes').then(m => m.routes),
                title: nameApp + 'Tipos Sistema'
            }
        ]
    },
];