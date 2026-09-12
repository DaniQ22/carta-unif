import { HorarioSemana, RangoHorario } from '../models/linea';

function minutosDelDia(hora: string): number {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/** Rango de atención vigente hoy (o el día que traiga `ahora`), según excepciones. */
export function rangoDeHoy(horario: HorarioSemana, ahora = new Date()): RangoHorario | null {
  const dia = ahora.getDay();
  const excepcion = horario.excepciones?.[dia];
  return excepcion !== undefined ? excepcion : horario.defecto;
}

/** ¿La línea está abierta en este momento? */
export function estaAbierto(horario: HorarioSemana, ahora = new Date()): boolean {
  const rango = rangoDeHoy(horario, ahora);
  if (!rango) return false;

  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const inicio = minutosDelDia(rango.abre);
  const fin = minutosDelDia(rango.cierra);

  // Rango que cruza medianoche (ej: 18:00 – 02:00).
  if (fin <= inicio) return minutos >= inicio || minutos < fin;
  return minutos >= inicio && minutos < fin;
}

/** Texto corto del horario de hoy, para mostrar en tarjetas/badges. */
export function textoHorarioHoy(horario: HorarioSemana, ahora = new Date()): string {
  const rango = rangoDeHoy(horario, ahora);
  return rango ? `${rango.abre} – ${rango.cierra}` : 'Cerrado hoy';
}
