import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Dish, DishOpcion, DishOpcionGrupo, DishVariante } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { DishDetailService } from '../../services/dish-detail.service';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { iniciales } from '../../utils/texto';
import { cocinaDeCategoria } from '../../utils/cocina';
import { cloudinarySrcset } from '../../utils/cloudinary';

@Component({
  selector: 'app-dish-card',
  imports: [PrecioPipe],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishCard {
  readonly dish = input.required<Dish>();

  private readonly detail = inject(DishDetailService);

  /** Id de la variante elegida (Familiar/Mediano); por defecto, la primera. */
  protected readonly tamano = signal<string | null>(null);

  protected readonly varianteActiva = computed<DishVariante | null>(() => {
    const variantes = this.dish().variantes;
    if (!variantes?.length) return null;
    const elegida = this.tamano();
    const encontrada = elegida ? variantes.find((v) => v.id === elegida) : undefined;
    // Sin selección: arranca en la variante más barata (coincide con `dish.precio`).
    return encontrada ?? variantes.find((v) => v.precio === this.dish().precio) ?? variantes[0];
  });

  /**
   * Grupo de elección que se muestra en la propia tarjeta (desgranados: papas
   * o bollo). Solo cuando el plato tiene un único grupo; con más (combos) se
   * elige desde el detalle.
   */
  protected readonly grupoEnTarjeta = computed<DishOpcionGrupo | null>(() => {
    const opciones = this.dish().opciones;
    return opciones?.length === 1 ? opciones[0] : null;
  });

  /** Id de la opción elegida en la tarjeta. */
  protected readonly eleccion = signal<string | null>(null);

  protected readonly opcionElegida = computed<DishOpcion | null>(
    () => this.grupoEnTarjeta()?.opciones.find((o) => o.id === this.eleccion()) ?? null,
  );

  /** Id efectivo para el carrito: distingue el mismo plato por tamaño y opción (igual que el detalle). */
  protected readonly idCarrito = computed(() =>
    [this.dish().id, this.varianteActiva()?.id, this.opcionElegida()?.id].filter(Boolean).join('__'),
  );

  protected readonly srcset = computed(() => {
    const imagen = this.dish().imagen;
    return imagen ? cloudinarySrcset(imagen) : null;
  });

  protected readonly precioMostrado = computed(() => this.varianteActiva()?.precio ?? this.dish().precio);

  /** Platos con varias elecciones obligatorias (combos): se agregan desde el detalle. */
  protected readonly tieneOpciones = computed(() => !!this.dish().opciones?.length && !this.grupoEnTarjeta());

  /** Falta escoger la opción de la tarjeta antes de poder agregar. */
  protected readonly faltaElegir = computed(() => !!this.grupoEnTarjeta() && !this.opcionElegida());

  protected readonly cantidad = computed(() => {
    if (!this.tieneOpciones()) return this.cart.cantidadDe(this.idCarrito());
    // Suma todas las combinaciones de opciones de este plato que haya en el carrito.
    const prefijo = `${this.dish().id}__`;
    return this.cart
      .items()
      .filter((it) => it.id.startsWith(prefijo))
      .reduce((acc, it) => acc + it.cantidad, 0);
  });

  constructor(protected cart: CartService) {}

  elegirTamano(id: string): void {
    this.tamano.set(id);
  }

  elegirOpcion(id: string): void {
    this.eleccion.set(id);
  }

  agregar(): void {
    if (this.faltaElegir()) return;
    const dish = this.dish();
    const detalle = [this.varianteActiva()?.nombre, this.opcionElegida()?.nombre].filter(Boolean).join(', ');
    this.cart.agregar({
      id: this.idCarrito(),
      nombre: detalle ? `${dish.nombre} (${detalle})` : dish.nombre,
      precio: this.precioMostrado(),
      cocina: cocinaDeCategoria(dish.categoria),
    });
  }

  verDetalle(): void {
    this.detail.abrir(this.dish());
  }

  /** Texto accesible del indicador de la foto: "3 fotos", "2 fotos y video"... */
  protected readonly resumenMedios = computed(() => {
    const fotos = 1 + (this.dish().imagenes?.length ?? 0);
    return `${fotos} ${fotos === 1 ? 'foto' : 'fotos'}${this.dish().video ? ' y video' : ''}`;
  });

  iniciales(): string {
    return iniciales(this.dish().nombre);
  }
}
