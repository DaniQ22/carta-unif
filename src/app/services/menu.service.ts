import { Injectable } from '@angular/core';
import { ADICIONES, BEBIDAS, CATEGORIAS, PLATOS } from '../data/menu.data';
import { Category, Dish, ExtraItem } from '../models/dish';
import { LineaId } from '../models/linea';

@Injectable({ providedIn: 'root' })
export class MenuService {
  /** Categoría principal de una línea. */
  getCategoria(lineaId: LineaId): Category {
    return CATEGORIAS.find((c) => c.id === lineaId)!;
  }

  /** Platos de la carta principal de una línea. */
  getPrincipales(lineaId: LineaId): Dish[] {
    return PLATOS.filter((p) => p.categoria === lineaId);
  }

  /** Asados: grupo transversal, filtrado a las líneas donde aplica. */
  getAsados(lineaId: LineaId): Dish[] {
    return PLATOS.filter((p) => p.categoria === 'asados' && (!p.lineas || p.lineas.includes(lineaId)));
  }

  getDestacados(lineaId: LineaId): Dish[] {
    return this.getPrincipales(lineaId).filter((p) => p.destacado);
  }

  getAdiciones(lineaId: LineaId): ExtraItem[] {
    return ADICIONES.filter((it) => !it.linea || it.linea === lineaId);
  }

  getBebidas(lineaId: LineaId): ExtraItem[] {
    return BEBIDAS.filter((it) => !it.linea || it.linea === lineaId);
  }
}
