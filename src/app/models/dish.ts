import { CocinaId } from './cocina';

export type { CocinaId };

/** Agrupación de un plato: su cocina principal, o el grupo transversal 'asados'. */
export type MenuGroupId = CocinaId | 'asados';

export interface Category {
  id: CocinaId;
  nombre: string;
  descripcion: string;
}

/** Una opción de tamaño de un plato (ej: Familiar / Mediano), con su propio precio. */
export interface DishVariante {
  id: string;
  nombre: string;
  precio: number;
}

/** Una opción dentro de un grupo de elección (ej: 'Pollo' dentro de 'Proteína'). */
export interface DishOpcion {
  id: string;
  nombre: string;
}

/**
 * Grupo de elección obligatoria de un plato (ej: 'Proteína', 'Bebida'). El
 * cliente escoge exactamente una opción de cada grupo; no cambia el precio.
 */
export interface DishOpcionGrupo {
  id: string;
  nombre: string;
  opciones: DishOpcion[];
}

export interface Dish {
  id: string;
  categoria: MenuGroupId;
  nombre: string;
  descripcion?: string;
  /** Precio a mostrar cuando no hay `variantes`, o precio por defecto (la primera variante) si las hay. */
  precio: number;
  /** Foto principal: la que se ve en la tarjeta y abre la galería del detalle. */
  imagen?: string;
  /** Fotos adicionales (otros ángulos) que se suman a `imagen` en la galería del detalle. */
  imagenes?: string[];
  destacado?: boolean;
  /** Etiquetas para los filtros de la carta (ej: 'Hamburguesas', 'Al wok'). */
  etiquetas?: string[];
  /** Ingredientes/composición, para el detalle del producto. */
  ingredientes?: string[];
  /** Tamaños seleccionables (ej: Familiar/Mediano), cada uno con su precio. */
  variantes?: DishVariante[];
  /** Elecciones obligatorias (ej: proteína y bebida de un combo). */
  opciones?: DishOpcionGrupo[];
}

/** Ítem simple sin foto (adiciones y bebidas). */
export interface ExtraItem {
  id: string;
  grupo: 'adiciones' | 'bebidas';
  nombre: string;
  precio: number;
}

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  nota?: string;
  /**
   * Cocina que prepara este ítem. Define a qué WhatsApp se envía el pedido:
   * si el carrito tiene algún ítem de `'arroces'`, el pedido va a Caribe Wok;
   * si no, va a Pamer. Las adiciones y bebidas no la llevan (no cambian el
   * destino del pedido).
   */
  cocina?: CocinaId;
}
