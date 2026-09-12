import { Injectable, signal } from '@angular/core';
import { Dish } from '../models/dish';

/** Controla el panel de detalle de producto (ingredientes, descripción). */
@Injectable({ providedIn: 'root' })
export class DishDetailService {
  private readonly _dish = signal<Dish | null>(null);

  readonly dish = this._dish.asReadonly();

  abrir(dish: Dish): void {
    this._dish.set(dish);
  }

  cerrar(): void {
    this._dish.set(null);
  }
}
