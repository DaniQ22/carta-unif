import { computed, Injectable, signal } from '@angular/core';
import { LINEAS } from '../data/lineas.config';
import { LineaConfig, LineaId } from '../models/linea';

/**
 * Línea de marca activa (Caribe Wok / Pamer). `null` = sin elegir todavía
 * (pantalla selectora). El resto de la app se retematiza vía la clase
 * `body.tema-<id>` que pone `App` en un `effect()`.
 */
@Injectable({ providedIn: 'root' })
export class LineaService {
  private readonly _activaId = signal<LineaId | null>(null);

  readonly activaId = this._activaId.asReadonly();

  readonly activa = computed<LineaConfig | null>(() => {
    const id = this._activaId();
    return id ? LINEAS[id] : null;
  });

  setActiva(id: LineaId): void {
    this._activaId.set(id);
  }

  /** Vuelve al estado "sin línea elegida" (pantalla selectora). */
  limpiar(): void {
    this._activaId.set(null);
  }
}
