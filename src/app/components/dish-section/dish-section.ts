import { Component, input } from '@angular/core';
import { Dish } from '../../models/dish';
import { DishCard } from '../dish-card/dish-card';

/** Sección con foto para menús transversales (ej: Asados en ambas cartas). */
@Component({
  selector: 'app-dish-section',
  imports: [DishCard],
  templateUrl: './dish-section.html',
  styleUrl: './dish-section.scss',
})
export class DishSection {
  readonly titulo = input.required<string>();
  readonly descripcion = input<string>('');
  readonly dishes = input.required<Dish[]>();
}
