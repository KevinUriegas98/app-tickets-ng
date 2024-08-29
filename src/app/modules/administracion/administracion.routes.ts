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
                path: 'tickets',
                loadChildren: () => import('./pages/tickets/tickets.routes').then(m => m.routes),
                title: nameApp + 'Tickets'
            }
        ]
    },
];