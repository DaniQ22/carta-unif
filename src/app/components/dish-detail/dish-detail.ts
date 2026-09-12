import { Component, computed, effect, inject } from '@angular/core';
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
  protected readonly cantidad = computed(() => {
    const d = this.dish();
    return d ? this.cart.cantidadDe(d.id) : 0;
  });

  constructor(protected cart: CartService) {
    effect(() => {
      if (this.abierto()) this.scrollLock.lock();
      else this.scrollLock.unlock();
    });
  }

  cerrar(): void {
    this.detail.cerrar();
  }

  agregar(): void {
    const d = this.dish();
    if (d) this.cart.agregar(d);
  }

  iniciales(nombre: string): string {
    return iniciales(nombre);
  }
}
