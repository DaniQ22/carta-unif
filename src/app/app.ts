import { Component, computed, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './components/site-header/site-header';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { DishDetail } from './components/dish-detail/dish-detail';
import { EMPRESA } from './data/empresa.config';
import { CartService } from './services/cart.service';
import { PrecioPipe } from './pipes/precio-pipe';

const THEME_COLOR = '#0d0d0f';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, CartDrawer, DishDetail, PrecioPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly empresa = EMPRESA;
  protected readonly carritoAbierto = signal(false);
  protected readonly anio = new Date().getFullYear();

  /** El botón flotante "Ver pedido" tapa el footer si no le reservamos espacio. */
  protected readonly mostrarFab = computed(
    () => this.cart.totalUnidades() > 0 && !this.carritoAbierto(),
  );

  /** "Volver arriba": aparece solo cuando el scroll llega cerca del final de la página. */
  protected readonly mostrarVolverArriba = signal(false);

  @HostListener('window:scroll')
  @HostListener('window:resize')
  protected actualizarVolverArriba(): void {
    const doc = document.documentElement;
    const hayScroll = doc.scrollHeight > window.innerHeight + 200;
    const cercaDelFinal = doc.scrollHeight - (window.scrollY + window.innerHeight) < 200;
    this.mostrarVolverArriba.set(hayScroll && cercaDelFinal);
  }

  constructor(protected cart: CartService) {
    document.title = `${EMPRESA.nombre} — Carta`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR);
  }

  volverArriba(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  abrirCarrito(): void {
    this.carritoAbierto.set(true);
  }

  cerrarCarrito(): void {
    this.carritoAbierto.set(false);
  }
}
