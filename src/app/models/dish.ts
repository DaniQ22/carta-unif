import { LineaId } from './linea';

export type { LineaId };

/** Agrupación de un plato: su línea principal, o el grupo transversal 'asados'. */
export type MenuGroupId = LineaId | 'asados';

export interface Category {
  id: LineaId;
  nombre: string;
  descripcion: string;
}

export interface Dish {
  id: string;
  categoria: MenuGroupId;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  destacado?: boolean;
  /** Etiquetas para los filtros de la carta (ej: 'Hamburguesas', 'Al wok'). */
  etiquetas?: string[];
  /** Ingredientes/composición, para el detalle del producto. */
  ingredientes?: string[];
  /**
   * Solo aplica a `categoria: 'asados'` (grupo transversal): a qué líneas
   * pertenece este plato. Si se omite, se muestra en todas las líneas.
   */
  lineas?: LineaId[];
}

/** Ítem simple sin foto (adiciones y bebidas). */
export interface ExtraItem {
  id: string;
  grupo: 'adiciones' | 'bebidas';
  nombre: string;
  precio: number;
  /** Línea a la que pertenece. Si se omite, es transversal (visible en todas). */
  linea?: LineaId;
}

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  nota?: string;
}
