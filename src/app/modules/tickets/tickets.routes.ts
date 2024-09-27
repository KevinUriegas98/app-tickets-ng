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
                redirectTo:'tickets',
                pathMatch:'full'
            },
            {
                path: '',
                loadChildren: () => import('./pages/tickets/tickets.routes').then(m => m.routes),
                title: nameApp + 'Tickets'
            }
        ]
    },
];