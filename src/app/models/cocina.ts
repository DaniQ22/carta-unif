/** Identificador de la cocina que prepara y recibe por WhatsApp una parte del pedido. */
export type CocinaId = 'arroces' | 'comidas-rapidas';

/** Rango de atención en un día. Formato de hora: 'HH:mm' (24h). */
export interface RangoHorario {
  abre: string;
  cierra: string;
}

/**
 * Horario semanal del negocio.
 * `excepciones` usa el índice de día de JS: 0=domingo … 6=sábado.
 * Un valor `null` (en `defecto` o en una excepción) significa "cerrado ese día".
 */
export interface HorarioSemana {
  defecto: RangoHorario | null;
  excepciones?: Partial<Record<number, RangoHorario | null>>;
}

/**
 * Cocina que prepara una parte del pedido (arroces vs. comidas rápidas/asados).
 * El menú es uno solo; esto solo define a qué WhatsApp se envía el pedido.
 */
export interface CocinaConfig {
  id: CocinaId;
  nombre: string;
  /**
   * WhatsApp de la cocina. Formato internacional sin "+", sin espacios ni
   * guiones.
   */
  whatsapp: string;
}
