import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './components/site-header/site-header';
import { CartDrawer } from './components/cart-drawer/cart-drawer';
import { DishDetail } from './components/dish-detail/dish-detail';
import { EMPRESA } from './data/empresa.config';
import { CartService } from './services/cart.service';
import { PrecioPipe } from './pipes/precio-pipe';

const THEME_COLOR = '#1a0f0a';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, CartDrawer, DishDetail, PrecioPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  /** Marca vacía al final de la página; se observa en vez de escuchar cada evento de scroll. */
  private readonly finPagina = viewChild.required<ElementRef<HTMLElement>>('finPagina');

  constructor(protected cart: CartService) {
    document.title = `${EMPRESA.nombre} — Carta`;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR);

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // El margen inferior hace que "intersecte" cuando faltan menos de 200px para el final.
      const observer = new IntersectionObserver(
        ([entry]) => {
          const hayScroll = document.documentElement.scrollHeight > window.innerHeight + 200;
          this.mostrarVolverArriba.set(hayScroll && entry.isIntersecting);
        },
        { rootMargin: '0px 0px 200px 0px' },
      );
      observer.observe(this.finPagina().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
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
