import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  linkedSignal,
  signal,
  viewChild,
} from '@angular/core';
import { DishOpcion, DishVariante } from '../../models/dish';
import { CartService } from '../../services/cart.service';
import { DishDetailService } from '../../services/dish-detail.service';
import { ScrollLockService } from '../../services/scroll-lock.service';
import { PrecioPipe } from '../../pipes/precio-pipe';
import { iniciales } from '../../utils/texto';
import { cocinaDeCategoria } from '../../utils/cocina';
import { cloudinaryVideoPoster, cloudinaryVideoUrl } from '../../utils/cloudinary';

/** Diapositiva de la galería del detalle: una foto o el video del plato. */
type Medio = { tipo: 'foto'; src: string } | { tipo: 'video'; src: string; poster: string };

@Component({
  selector: 'app-dish-detail',
  imports: [PrecioPipe],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishDetail {
  private readonly detail = inject(DishDetailService);
  private readonly scrollLock = inject(ScrollLockService);

  protected readonly dish = this.detail.dish;
  protected readonly abierto = computed(() => this.dish() !== null);

  /** Foto principal + fotos adicionales (otros ángulos), sin repetidas, y el video al final. */
  protected readonly medios = computed<Medio[]>(() => {
    const d = this.dish();
    if (!d) return [];
    const fotos = [...new Set([d.imagen, ...(d.imagenes ?? [])].filter((f): f is string => !!f))];
    const medios: Medio[] = fotos.map((src) => ({ tipo: 'foto', src }));
    if (d.video) {
      medios.push({ tipo: 'video', src: cloudinaryVideoUrl(d.video), poster: cloudinaryVideoPoster(d.video) });
    }
    return medios;
  });

  private readonly clip = viewChild<ElementRef<HTMLVideoElement>>('clip');

  /** Índice de la diapositiva visible en la galería; vuelve a la primera al cambiar de plato. */
  protected readonly fotoActiva = linkedSignal(() => {
    this.dish();
    return 0;
  });

  /** Id de la variante elegida (Familiar/Mediano); por defecto, la más barata. */
  protected readonly tamano = signal<string | null>(null);

  protected readonly varianteActiva = computed<DishVariante | null>(() => {
    const d = this.dish();
    const variantes = d?.variantes;
    if (!d || !variantes?.length) return null;
    const elegida = this.tamano();
    const encontrada = elegida ? variantes.find((v) => v.id === elegida) : undefined;
    return encontrada ?? variantes.find((v) => v.precio === d.precio) ?? variantes[0];
  });

  /** Opción elegida por grupo (id de grupo → id de opción); se reinicia al cambiar de plato. */
  protected readonly elecciones = linkedSignal<Record<string, string>>(() => {
    this.dish();
    return {};
  });

  /** Opciones elegidas, en el orden de los grupos del plato. */
  private readonly opcionesElegidas = computed<DishOpcion[]>(() => {
    const elegidas = this.elecciones();
    return (this.dish()?.opciones ?? [])
      .map((g) => g.opciones.find((o) => o.id === elegidas[g.id]))
      .filter((o): o is DishOpcion => !!o);
  });

  /** Si falta elegir alguna opción obligatoria (proteína, bebida...). */
  protected readonly faltaElegir = computed(
    () => this.opcionesElegidas().length < (this.dish()?.opciones?.length ?? 0),
  );

  /** Id efectivo para el carrito: distingue el mismo plato por tamaño y opciones. */
  protected readonly idCarrito = computed(() => {
    const d = this.dish();
    if (!d) return '';
    const variante = this.varianteActiva();
    const partes = [d.id, variante?.id, ...this.opcionesElegidas().map((o) => o.id)];
    return partes.filter(Boolean).join('__');
  });

  protected readonly precioMostrado = computed(() => this.varianteActiva()?.precio ?? this.dish()?.precio ?? 0);

  protected readonly cantidad = computed(() => (this.dish() ? this.cart.cantidadDe(this.idCarrito()) : 0));

  constructor(protected cart: CartService) {
    effect(() => {
      if (this.abierto()) this.scrollLock.lock();
      else this.scrollLock.unlock();
    });

    // El video solo corre mientras su diapositiva está a la vista. Con
    // preload="none", hasta el primer play() no se descarga nada.
    effect(() => {
      const video = this.clip()?.nativeElement;
      if (!video) return;
      const indiceVideo = this.medios().findIndex((m) => m.tipo === 'video');
      if (this.fotoActiva() === indiceVideo) {
        video.play().catch(() => {
          /* el navegador bloqueó el autoplay: queda la portada */
        });
      } else {
        video.pause();
      }
    });
  }

  cerrar(): void {
    this.detail.cerrar();
  }

  elegirTamano(id: string): void {
    this.tamano.set(id);
  }

  elegirOpcion(grupoId: string, opcionId: string): void {
    this.elecciones.update((e) => ({ ...e, [grupoId]: opcionId }));
  }

  agregar(): void {
    const d = this.dish();
    if (!d || this.faltaElegir()) return;
    const detalles = [this.varianteActiva()?.nombre, this.opcionesElegidas().map((o) => o.nombre).join(' + ')];
    const detalle = detalles.filter(Boolean).join(', ');
    this.cart.agregar({
      id: this.idCarrito(),
      nombre: detalle ? `${d.nombre} (${detalle})` : d.nombre,
      precio: this.precioMostrado(),
      cocina: cocinaDeCategoria(d.categoria),
    });
  }

  alDeslizarGaleria(galeria: HTMLElement): void {
    this.fotoActiva.set(Math.round(galeria.scrollLeft / galeria.clientWidth));
  }

  irAFoto(galeria: HTMLElement, indice: number): void {
    const i = Math.max(0, Math.min(indice, this.medios().length - 1));
    galeria.scrollTo({ left: i * galeria.clientWidth, behavior: 'smooth' });
    this.fotoActiva.set(i);
  }

  iniciales(nombre: string): string {
    return iniciales(nombre);
  }
}
