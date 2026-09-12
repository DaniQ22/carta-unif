import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ScrollLockService } from '../../services/scroll-lock.service';
import { PrecioPipe } from '../../pipes/precio-pipe';

@Component({
  selector: 'app-cart-drawer',
  imports: [FormsModule, PrecioPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {
  readonly abierto = input(false);
  readonly cerrar = output<void>();

  protected cliente = signal('');
  protected telefono = signal('');
  protected direccion = signal('');
  protected referencia = signal('');
  protected enviado = signal(false);
  protected intento = signal(false);

  /** Para delivery pedimos nombre, teléfono y dirección. */
  protected readonly datosOk = computed(
    () =>
      this.cliente().trim().length > 1 &&
      this.telefono().trim().length >= 6 &&
      this.direccion().trim().length > 3,
  );

  private readonly scrollLock = inject(ScrollLockService);

  constructor(protected cart: CartService) {
    effect(() => {
      if (this.abierto()) this.scrollLock.lock();
      else this.scrollLock.unlock();
    });
  }

  enviarPedido(): void {
    if (this.cart.vacio()) return;
    this.intento.set(true);
    if (!this.datosOk()) return;

    const link = this.cart.construirLinkWhatsApp({
      cliente: this.cliente(),
      telefono: this.telefono(),
      direccion: this.direccion(),
      referencia: this.referencia(),
    });
    window.open(link, '_blank', 'noopener');
    this.enviado.set(true);
  }

  nuevoPedido(): void {
    this.cart.vaciar();
    this.cliente.set('');
    this.telefono.set('');
    this.direccion.set('');
    this.referencia.set('');
    this.enviado.set(false);
    this.intento.set(false);
    this.cerrar.emit();
  }
}
