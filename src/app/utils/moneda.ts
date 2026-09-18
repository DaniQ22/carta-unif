import { EMPRESA } from '../data/empresa.config';

/** Formatea un valor en pesos: 18000 -> "$18.000". */
export function formatoPrecio(valor: number): string {
  return EMPRESA.moneda + (valor ?? 0).toLocaleString('es-CO', { maximumFractionDigits: 0 });
}
