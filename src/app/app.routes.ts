import { Routes } from '@angular/router';
import { MenuPage } from './pages/menu-page/menu-page';

export const routes: Routes = [
  {
    path: '',
    // Carga directa (no lazy): es la única página, lazy solo agregaba una descarga extra antes de pintar.
    component: MenuPage,
    title: 'Carta — Pamer Wook',
  },
  // Compatibilidad con enlaces/QR antiguos del selector de cartas.
  { path: 'wok', redirectTo: '' },
  { path: 'comidas-rapidas', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
