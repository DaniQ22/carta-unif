import { Component, computed, effect, inject, signal } from '@angular/core';
import { DishVariante } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { DishDetailService } from '../../services/dish-detail.service';
import { ScrollLockService } from '../../services/scroll-lock.service';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { iniciales } from '../../utils/texto';

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

  protected readonly idCarrito = computed(() => {
    const d = this.dish();
    const variante = this.varianteActiva();
    if (!d) return '';
    return variante ? `${d.id}__${variante.id}` : d.id;
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

  agregar(): void {
    const d = this.dish();
    if (!d) return;
    const variante = this.varianteActiva();
    this.cart.agregar({
      id: this.idCarrito(),
      nombre: variante ? `${d.nombre} (${variante.nombre})` : d.nombre,
      precio: this.precioMostrado(),
    });
  }

  iniciales(nombre: string): string {
    return iniciales(nombre);
  }
}
