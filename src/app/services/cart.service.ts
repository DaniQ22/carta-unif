import { computed, Injectable, signal } from '@angular/core';
import { COCINAS, EMPRESA } from '../data/empresa.config';
import { CartItem } from '../models/dish';
import { CocinaId } from '../models/cocina';
import { formatoPrecio } from '../utils/moneda';

const STORAGE_KEY = 'carta-unificada-carrito';

/** Cualquier cosa que se pueda agregar al carrito (plato, adición o bebida). */
export interface Agregable {
  id: string;
  nombre: string;
  precio: number;
  /**
   * Cocina que prepara el ítem (solo platos la llevan). Adiciones y bebidas
   * se omiten: no cambian a qué cocina se envía el pedido.
   */
  cocina?: CocinaId;
}

/**
 * Carrito de pedido a domicilio. Es un único carrito para todo el menú
 * (arroces, comidas rápidas, asados, adiciones y bebidas). Arma un solo
 * mensaje de WhatsApp con el detalle completo del pedido y lo envía al
 * número de la cocina responsable: si hay algún plato de `arroces`, va a
 * Caribe Wok; si no, va a Pamer (ver `construirLinkWhatsApp`).
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.restore());

  readonly items = this._items.asReadonly();

  /** Cantidad total de unidades (para el badge). */
  readonly totalUnidades = computed(() => this.items().reduce((acc, it) => acc + it.cantidad, 0));

  /** Total a pagar. */
  readonly totalPrecio = computed(() =>
    this.items().reduce((acc, it) => acc + it.cantidad * it.precio, 0),
  );

  readonly vacio = computed(() => this.items().length === 0);

  agregar(item: Agregable, cantidad = 1): void {
    this.actualizar((items) => {
      const existente = items.find((it) => it.id === item.id);
      if (existente) {
        return items.map((it) =>
          it.id === item.id ? { ...it, cantidad: it.cantidad + cantidad } : it,
        );
      }
      return [
        ...items,
        { id: item.id, nombre: item.nombre, precio: item.precio, cantidad, cocina: item.cocina },
      ];
    });
  }

  cambiarCantidad(id: string, cantidad: number): void {
    this.actualizar((items) =>
      items.map((it) => (it.id === id ? { ...it, cantidad } : it)).filter((it) => it.cantidad > 0),
    );
  }

  incrementar(id: string): void {
    const it = this.items().find((i) => i.id === id);
    if (it) this.cambiarCantidad(id, it.cantidad + 1);
  }

  decrementar(id: string): void {
    const it = this.items().find((i) => i.id === id);
    if (it) this.cambiarCantidad(id, it.cantidad - 1);
  }

  quitar(id: string): void {
    this.actualizar((items) => items.filter((it) => it.id !== id));
  }

  setNota(id: string, nota: string): void {
    this.actualizar((items) => items.map((it) => (it.id === id ? { ...it, nota } : it)));
  }

  vaciar(): void {
    this.actualizar(() => []);
  }

  cantidadDe(id: string): number {
    return this.items().find((it) => it.id === id)?.cantidad ?? 0;
  }

  /** Cocina a la que se enruta el pedido actual, según lo que haya en el carrito. */
  cocinaDestino(): CocinaId {
    const tieneArroces = this.items().some((it) => it.cocina === 'arroces');
    return tieneArroces ? 'arroces' : 'comidas-rapidas';
  }

  /**
   * Construye el enlace de WhatsApp con el detalle del pedido a domicilio,
   * dirigido a la cocina responsable del pedido.
   */
  construirLinkWhatsApp(datos?: {
    cliente?: string;
    telefono?: string;
    direccion?: string;
    referencia?: string;
  }): string {
    const cocina = COCINAS[this.cocinaDestino()];

    const lineas: string[] = [];

    lineas.push(EMPRESA.saludoPedido);
    lineas.push(`*Pedido — ${cocina.nombre}*`);
    lineas.push('');

    for (const it of this.items()) {
      const sub = formatoPrecio(it.cantidad * it.precio);
      lineas.push(`• ${it.cantidad} x ${it.nombre} — ${sub}`);
      if (it.nota?.trim()) lineas.push(`   ↳ _${it.nota.trim()}_`);
    }

    lineas.push('');
    lineas.push(`*Total: ${formatoPrecio(this.totalPrecio())}*`);
    lineas.push('');
    lineas.push('*Entrega:* Domicilio');

    if (datos?.cliente?.trim()) lineas.push(`Cliente: ${datos.cliente.trim()}`);
    if (datos?.telefono?.trim()) lineas.push(`Teléfono: ${datos.telefono.trim()}`);
    if (datos?.direccion?.trim()) lineas.push(`Dirección: ${datos.direccion.trim()}`);
    if (datos?.referencia?.trim()) lineas.push(`Referencia: ${datos.referencia.trim()}`);

    const texto = encodeURIComponent(lineas.join('\n'));
    return `https://wa.me/${cocina.whatsapp}?text=${texto}`;
  }

  /** Aplica `fn` sobre el carrito y persiste el resultado. */
  private actualizar(fn: (items: CartItem[]) => CartItem[]): void {
    this._items.update(fn);
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }

  private restore(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (it) => it && typeof it.id === 'string' && typeof it.precio === 'number',
      );
    } catch {
      return [];
    }
  }
}
