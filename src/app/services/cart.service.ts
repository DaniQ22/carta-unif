import { computed, inject, Injectable, signal } from '@angular/core';
import { EMPRESA } from '../data/lineas.config';
import { CartItem } from '../models/dish';
import { LineaId } from '../models/linea';
import { formatoPrecio } from '../utils/moneda';
import { LineaService } from './linea.service';

const STORAGE_KEY = 'carta-unificada-carritos';

/** Cualquier cosa que se pueda agregar al carrito (plato, adición o bebida). */
export interface Agregable {
  id: string;
  nombre: string;
  precio: number;
}

type Carritos = Partial<Record<LineaId, CartItem[]>>;

/**
 * Carrito de pedido a domicilio. Hay UN carrito por línea de marca (Caribe
 * Wok / RM), indexado por `LineaService.activaId()`. Arma el mensaje de
 * WhatsApp con el detalle del pedido y lo envía al número del cocinero de
 * la línea activa (ver `LineaConfig.whatsappCocinero`).
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly lineaSvc = inject(LineaService);

  private readonly _carritos = signal<Carritos>(this.restore());

  /** Ítems del carrito de la línea actualmente activa. */
  readonly items = computed<CartItem[]>(() => {
    const id = this.lineaSvc.activaId();
    return id ? (this._carritos()[id] ?? []) : [];
  });

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
      return [...items, { id: item.id, nombre: item.nombre, precio: item.precio, cantidad }];
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

  /**
   * Construye el enlace de WhatsApp con el detalle del pedido a domicilio,
   * dirigido al cocinero de la línea activa.
   */
  construirLinkWhatsApp(datos?: {
    cliente?: string;
    telefono?: string;
    direccion?: string;
    referencia?: string;
  }): string {
    const linea = this.lineaSvc.activa();
    if (!linea) return '';

    const lineas: string[] = [];

    lineas.push(EMPRESA.saludoPedido);
    lineas.push(`*Pedido — ${linea.nombre}*`);
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
    return `https://wa.me/${linea.whatsappCocinero}?text=${texto}`;
  }

  /** Aplica `fn` sobre el carrito de la línea activa y persiste el resultado. */
  private actualizar(fn: (items: CartItem[]) => CartItem[]): void {
    const id = this.lineaSvc.activaId();
    if (!id) return;
    this._carritos.update((carritos) => ({ ...carritos, [id]: fn(carritos[id] ?? []) }));
    this.persist();
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._carritos()));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }

  private restore(): Carritos {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

      const carritos: Carritos = {};
      for (const [lineaId, items] of Object.entries(parsed)) {
        if (!Array.isArray(items)) continue;
        carritos[lineaId as LineaId] = items.filter(
          (it) => it && typeof it.id === 'string' && typeof it.precio === 'number',
        );
      }
      return carritos;
    } catch {
      return {};
    }
  }
}
