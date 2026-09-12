import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LineaConfig } from '../../models/linea';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  readonly marca = input.required<LineaConfig>();
  readonly abrirCarrito = output<void>();

  constructor(protected cart: CartService) {}
}
