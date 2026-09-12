import { Component, computed, effect, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './components/site-header/site-header';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { DishDetail } from './components/dish-detail/dish-detail';
import { EMPRESA } from './data/lineas.config';
import { CartService } from './services/cart.service';
import { LineaService } from './services/linea.service';
import { PrecioPipe } from './pipes/precio-pipe';

/** theme-color de la barra de estado móvil: uno por línea, y uno neutro para el selector. */
const THEME_COLOR: Record<string, string> = {
  arroces: '#05221f',
  'comidas-rapidas': '#0d0d0f',
};
const THEME_COLOR_NEUTRO = '#0b0b10';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, CartDrawer, DishDetail, PrecioPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly lineaSvc = inject(LineaService);

  protected readonly empresa = EMPRESA;
  protected readonly linea = this.lineaSvc.activa;
  protected readonly carritoAbierto = signal(false);
  protected readonly anio = new Date().getFullYear();

  /** El botón flotante "Ver pedido" tapa el footer si no le reservamos espacio. */
  protected readonly mostrarFab = computed(
    () => !!this.linea() && this.cart.totalUnidades() > 0 && !this.carritoAbierto(),
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
    effect(() => {
      const linea = this.linea();
      const id = linea?.id ?? null;

      document.body.classList.toggle('tema-arroces', id === 'arroces');
      document.body.classList.toggle('tema-comidas-rapidas', id === 'comidas-rapidas');

      const themeMeta = document.querySelector('meta[name="theme-color"]');
      themeMeta?.setAttribute('content', (id && THEME_COLOR[id]) || THEME_COLOR_NEUTRO);

      document.title = linea ? `${linea.nombre} — Carta` : 'Caribe Wok & Pamer — Carta digital';
    });
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
