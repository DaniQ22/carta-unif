/** Iniciales para el fallback visual cuando un plato no tiene foto. */
export function iniciales(nombre: string): string {
  return (nombre.match(/[a-záéíóúñ]/gi) ?? []).slice(0, 2).join('').toUpperCase();
}
