import { Component, output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { EMPRESA } from '../../data/empresa.config';

@Component({
  selector: 'app-site-header',
  imports: [],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly empresa = EMPRESA;
  readonly abrirCarrito = output<void>();

  constructor(protected cart: CartService) {}
}
