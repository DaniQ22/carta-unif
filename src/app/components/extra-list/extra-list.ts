import { Component, input } from '@angular/core';
import { ExtraItem } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { PrecioPipe } from '../../pipes/precio-pipe';

@Component({
  selector: 'app-extra-list',
  imports: [PrecioPipe],
  templateUrl: './extra-list.html',
  styleUrl: './extra-list.scss',
})
export class ExtraList {
  readonly titulo = input.required<string>();
  readonly descripcion = input<string>('');
  readonly items = input.required<ExtraItem[]>();

  constructor(protected cart: CartService) {}
}
