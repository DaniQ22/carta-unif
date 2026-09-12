import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/selector-page/selector-page').then((m) => m.SelectorPage),
    title: 'Elige tu carta',
  },
  {
    path: 'wok',
    loadComponent: () => import('./pages/menu-page/menu-page').then((m) => m.MenuPage),
    data: { lineaId: 'arroces' },
    title: 'Caribe Wok — Carta',
  },
  {
    path: 'comidas-rapidas',
    loadComponent: () => import('./pages/menu-page/menu-page').then((m) => m.MenuPage),
    data: { lineaId: 'comidas-rapidas' },
    title: 'Pamer — Carta',
  },
  { path: '**', redirectTo: '' },
];
