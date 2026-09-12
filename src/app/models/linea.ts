/** Identificador de cada línea de marca del negocio. */
export type LineaId = 'arroces' | 'comidas-rapidas';

/** Rango de atención en un día. Formato de hora: 'HH:mm' (24h). */
export interface RangoHorario {
  abre: string;
  cierra: string;
}

/**
 * Horario semanal de la línea.
 * `excepciones` usa el índice de día de JS: 0=domingo … 6=sábado.
 * Un valor `null` (en `defecto` o en una excepción) significa "cerrado ese día".
 */
export interface HorarioSemana {
  defecto: RangoHorario | null;
  excepciones?: Partial<Record<number, RangoHorario | null>>;
}

/** Configuración de una línea de marca (datos que se muestran al cliente). */
export interface LineaConfig {
  id: LineaId;
  /** Segmento de URL de esta línea (ej: 'wok' → /wok). */
  ruta: string;
  nombre: string;
  eslogan: string;
  logo: string;
  /** Color de acento (hex) usado en la tarjeta del selector de línea. */
  colorAcento: string;
  /**
   * WhatsApp del cocinero que recibe los pedidos de esta línea.
   * Formato internacional sin "+", sin espacios ni guiones.
   */
  whatsappCocinero: string;
  horario: HorarioSemana;
}
