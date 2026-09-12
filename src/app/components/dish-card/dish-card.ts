import { Component, computed, inject, input } from '@angular/core';
import { Dish } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { DishDetailService } from '../../services/dish-detail.service';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { iniciales } from '../../utils/texto';

@Component({
  selector: 'app-dish-card',
  imports: [PrecioPipe],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.scss',
})
export class DishCard {
  readonly dish = input.required<Dish>();

  private readonly detail = inject(DishDetailService);

  protected readonly cantidad = computed(() => this.cart.cantidadDe(this.dish().id));

  constructor(protected cart: CartService) {}

  agregar(): void {
    this.cart.agregar(this.dish());
  }

  verDetalle(): void {
    this.detail.abrir(this.dish());
  }

  iniciales(): string {
    return iniciales(this.dish().nombre);
  }
}
