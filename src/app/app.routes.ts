import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/welcome/welcome.component').then((m) => m.WelcomeComponent),
    },
    {
        path: 'news',
        loadComponent: () => import('./pages/news/news').then((m) => m.News),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
