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
                path:'personas',
                loadChildren: () => import('./pages/personas/personas.routes').then(m => m.routes),
                title: nameApp + 'Personas'
            },
            {
                path:'perfiles',
                loadChildren: () => import('./pages/perfiles/perfiles.routes').then(m => m.routes),
                title: nameApp + 'Personas'
            },
            {
                path:'estatus-tickets',
                loadChildren: () => import('./pages/estatus-ticket/estatus-ticket.routes').then(m => m.routes),
                title: nameApp + 'Estatus Tickets'
            }
        ]
    },
];