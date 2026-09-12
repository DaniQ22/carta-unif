import { LineaId } from './linea';

export type { LineaId };

/** Agrupación de un plato: su línea principal, o el grupo transversal 'asados'. */
export type MenuGroupId = LineaId | 'asados';

export interface Category {
  id: LineaId;
  nombre: string;
  descripcion: string;
}

/** Una opción de tamaño de un plato (ej: Familiar / Mediano), con su propio precio. */
export interface DishVariante {
  id: string;
  nombre: string;
  precio: number;
}

export interface Dish {
  id: string;
  categoria: MenuGroupId;
  nombre: string;
  descripcion?: string;
  /** Precio a mostrar cuando no hay `variantes`, o precio por defecto (la primera variante) si las hay. */
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
  /** Tamaños seleccionables (ej: Familiar/Mediano), cada uno con su precio. */
  variantes?: DishVariante[];
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
