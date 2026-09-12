import { Injectable } from '@angular/core';

/**
 * Bloquea el scroll del fondo mientras hay un panel/hoja abierto.
 * ------------------------------------------------------------------
 * `overflow: hidden` en <body> NO evita el scroll táctil en iOS/Android
 * (el fondo se sigue pudiendo "arrastrar"). La técnica robusta es fijar
 * el body en su posición actual (`position: fixed`) y restaurar el
 * scroll al cerrar. Usa un contador para soportar varios paneles.
 */
@Injectable({ providedIn: 'root' })
export class ScrollLockService {
  private candados = 0;
  private scrollY = 0;

  lock(): void {
    if (this.candados === 0) {
      this.scrollY = window.scrollY;
      const body = document.body.style;
      body.position = 'fixed';
      body.top = `-${this.scrollY}px`;
      body.left = '0';
      body.right = '0';
      body.width = '100%';
    }
    this.candados++;
  }

  unlock(): void {
    this.candados = Math.max(0, this.candados - 1);
    if (this.candados === 0) {
      const body = document.body.style;
      body.position = '';
      body.top = '';
      body.left = '';
      body.right = '';
      body.width = '';
      window.scrollTo(0, this.scrollY);
    }
  }
}
