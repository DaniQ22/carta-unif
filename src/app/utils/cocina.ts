import { CocinaId } from '../models/cocina';
import { MenuGroupId } from '../models/dish';

/** A qué cocina pertenece cada grupo de platos, para enrutar el pedido de WhatsApp. */
export function cocinaDeCategoria(categoria: MenuGroupId): CocinaId {
  return categoria === 'arroces' ? 'arroces' : 'comidas-rapidas';
}
