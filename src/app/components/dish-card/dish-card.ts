import { Component, computed, inject, input, signal } from '@angular/core';
import { Dish, DishVariante } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { DishDetailService } from '../../services/dish-detail.service';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { iniciales } from '../../utils/texto';
import { cocinaDeCategoria } from '../../utils/cocina';

@Component({
  selector: 'app-dish-card',
  imports: [PrecioPipe],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.scss',
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

  /** Id efectivo para el carrito: distingue el mismo plato en distintos tamaños. */
  protected readonly idCarrito = computed(() => {
    const variante = this.varianteActiva();
    return variante ? `${this.dish().id}__${variante.id}` : this.dish().id;
  });

  protected readonly precioMostrado = computed(() => this.varianteActiva()?.precio ?? this.dish().precio);

  /** Platos con elecciones obligatorias (combos): se agregan desde el detalle. */
  protected readonly tieneOpciones = computed(() => !!this.dish().opciones?.length);

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

  agregar(): void {
    const dish = this.dish();
    const variante = this.varianteActiva();
    this.cart.agregar({
      id: this.idCarrito(),
      nombre: variante ? `${dish.nombre} (${variante.nombre})` : dish.nombre,
      precio: this.precioMostrado(),
      cocina: cocinaDeCategoria(dish.categoria),
    });
  }

  verDetalle(): void {
    this.detail.abrir(this.dish());
  }

  iniciales(): string {
    return iniciales(this.dish().nombre);
  }
}
