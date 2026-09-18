import { Injectable } from '@angular/core';
import { ADICIONES, BEBIDAS, CATEGORIAS, PLATOS } from '../data/menu.data';
import { Category, CocinaId, Dish, ExtraItem, MenuGroupId } from '../models/dish';

@Injectable({ providedIn: 'root' })
export class MenuService {
  /** Título y descripción de la sección de arroces o comidas rápidas. */
  getCategoria(id: CocinaId): Category {
    return CATEGORIAS.find((c) => c.id === id)!;
  }

  /** Platos de un grupo del menú ('arroces', 'comidas-rapidas' o 'asados'). */
  getPorCategoria(categoria: MenuGroupId): Dish[] {
    return PLATOS.filter((p) => p.categoria === categoria);
  }

  getDestacados(): Dish[] {
    return PLATOS.filter((p) => p.destacado);
  }

  getAdiciones(): ExtraItem[] {
    return ADICIONES;
  }

  getBebidas(): ExtraItem[] {
    return BEBIDAS;
  }
}
