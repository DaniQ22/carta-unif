import { Pipe, PipeTransform } from '@angular/core';
import { formatoPrecio } from '../utils/moneda';

@Pipe({ name: 'precio' })
export class PrecioPipe implements PipeTransform {
  transform(valor: number | null | undefined): string {
    return formatoPrecio(valor ?? 0);
  }
}
