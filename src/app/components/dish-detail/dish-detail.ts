import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { DishOpcion, DishVariante } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { DishDetailService } from '../../services/dish-detail.service';
import { ScrollLockService } from '../../services/scroll-lock.service';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { iniciales } from '../../utils/texto';
import { cocinaDeCategoria } from '../../utils/cocina';

@Component({
  selector: 'app-dish-detail',
  imports: [PrecioPipe],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.scss',
})
export class DishDetail {
  private readonly detail = inject(DishDetailService);
  private readonly scrollLock = inject(ScrollLockService);

  protected readonly dish = this.detail.dish;
  protected readonly abierto = computed(() => this.dish() !== null);

  /** Id de la variante elegida (Familiar/Mediano); por defecto, la más barata. */
  protected readonly tamano = signal<string | null>(null);

  protected readonly varianteActiva = computed<DishVariante | null>(() => {
    const d = this.dish();
    const variantes = d?.variantes;
    if (!d || !variantes?.length) return null;
    const elegida = this.tamano();
    const encontrada = elegida ? variantes.find((v) => v.id === elegida) : undefined;
    return encontrada ?? variantes.find((v) => v.precio === d.precio) ?? variantes[0];
  });

  /** Opción elegida por grupo (id de grupo → id de opción); se reinicia al cambiar de plato. */
  protected readonly elecciones = linkedSignal<Record<string, string>>(() => {
    this.dish();
    return {};
  });

  /** Opciones elegidas, en el orden de los grupos del plato. */
  private readonly opcionesElegidas = computed<DishOpcion[]>(() => {
    const elegidas = this.elecciones();
    return (this.dish()?.opciones ?? [])
      .map((g) => g.opciones.find((o) => o.id === elegidas[g.id]))
      .filter((o): o is DishOpcion => !!o);
  });

  /** Si falta elegir alguna opción obligatoria (proteína, bebida...). */
  protected readonly faltaElegir = computed(
    () => this.opcionesElegidas().length < (this.dish()?.opciones?.length ?? 0),
  );

  /** Id efectivo para el carrito: distingue el mismo plato por tamaño y opciones. */
  protected readonly idCarrito = computed(() => {
    const d = this.dish();
    if (!d) return '';
    const variante = this.varianteActiva();
    const partes = [d.id, variante?.id, ...this.opcionesElegidas().map((o) => o.id)];
    return partes.filter(Boolean).join('__');
  });

  protected readonly precioMostrado = computed(() => this.varianteActiva()?.precio ?? this.dish()?.precio ?? 0);

  protected readonly cantidad = computed(() => (this.dish() ? this.cart.cantidadDe(this.idCarrito()) : 0));

  constructor(protected cart: CartService) {
    effect(() => {
      if (this.abierto()) this.scrollLock.lock();
      else this.scrollLock.unlock();
    });
  }

  cerrar(): void {
    this.detail.cerrar();
  }

  elegirTamano(id: string): void {
    this.tamano.set(id);
  }

  elegirOpcion(grupoId: string, opcionId: string): void {
    this.elecciones.update((e) => ({ ...e, [grupoId]: opcionId }));
  }

  agregar(): void {
    const d = this.dish();
    if (!d || this.faltaElegir()) return;
    const detalles = [this.varianteActiva()?.nombre, this.opcionesElegidas().map((o) => o.nombre).join(' + ')];
    const detalle = detalles.filter(Boolean).join(', ');
    this.cart.agregar({
      id: this.idCarrito(),
      nombre: detalle ? `${d.nombre} (${detalle})` : d.nombre,
      precio: this.precioMostrado(),
      cocina: cocinaDeCategoria(d.categoria),
    });
  }

  iniciales(nombre: string): string {
    return iniciales(nombre);
  }
}
