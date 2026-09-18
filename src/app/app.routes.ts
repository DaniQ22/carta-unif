import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/menu-page/menu-page').then((m) => m.MenuPage),
    title: 'Carta — Caribe Wok & Pamer',
  },
  // Compatibilidad con enlaces/QR antiguos del selector de cartas.
  { path: 'wok', redirectTo: '' },
  { path: 'comidas-rapidas', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
