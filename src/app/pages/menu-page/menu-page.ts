import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LineaService } from '../../services/linea.service';
import { Dish, ExtraItem } from '../../models/dish';
import { LineaId } from '../../models/linea';
import { estaAbierto, textoHorarioHoy } from '../../utils/horario';
import { DishCard } from '../../components/dish-card/dish-card';
import { DishSection } from '../../components/dish-section/dish-section';
import { ExtraList } from '../../components/extra-list/extra-list';

type Orden = 'reco' | 'precio-asc' | 'precio-desc' | 'nombre';
const CHIP_RECO = '__reco__';

/** Quita tildes y pasa a minúsculas para comparar. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

@Component({
  selector: 'app-menu-page',
  imports: [FormsModule, DishCard, DishSection, ExtraList],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  private readonly menu = inject(MenuService);
  private readonly lineaSvc = inject(LineaService);
  private readonly route = inject(ActivatedRoute);

  protected readonly CHIP_RECO = CHIP_RECO;

  private readonly lineaId = this.route.snapshot.data['lineaId'] as LineaId;
  protected readonly linea = computed(() => this.lineaSvc.activa()!);
  protected readonly categoria = this.menu.getCategoria(this.lineaId);
  protected readonly abierta = computed(() => estaAbierto(this.linea().horario));
  protected readonly horarioHoy = computed(() => textoHorarioHoy(this.linea().horario));
  private readonly platos = this.menu.getPrincipales(this.lineaId);
  private readonly asados = this.menu.getAsados(this.lineaId);
  private readonly adiciones = this.menu.getAdiciones(this.lineaId);
  private readonly bebidas = this.menu.getBebidas(this.lineaId);

  constructor() {
    this.lineaSvc.setActiva(this.lineaId);
  }

  // ---- Estado de los filtros ----
  protected readonly busqueda = signal('');
  protected readonly chip = signal<string | null>(null); // null = Todos
  protected readonly orden = signal<Orden>('reco');

  /** Chips disponibles = etiquetas presentes en la carta. */
  protected readonly chips = computed(() => {
    const set = new Set<string>();
    for (const p of this.platos) (p.etiquetas ?? []).forEach((e) => set.add(e));
    return [...set].sort((a, b) => a.localeCompare(b, 'es'));
  });

  protected readonly platosFiltrados = computed(() => {
    const q = normalizar(this.busqueda().trim());
    const chip = this.chip();
    const chipValido = chip === CHIP_RECO || (chip !== null && this.chips().includes(chip));

    let lista = this.platos.filter((p) => {
      if (q && !normalizar(`${p.nombre} ${p.descripcion ?? ''} ${(p.etiquetas ?? []).join(' ')}`).includes(q)) {
        return false;
      }
      if (chipValido && chip === CHIP_RECO && !p.destacado) return false;
      if (chipValido && chip !== CHIP_RECO && !(p.etiquetas ?? []).includes(chip!)) return false;
      return true;
    });

    const orden = this.orden();
    lista = [...lista].sort((a, b) => {
      if (orden === 'precio-asc') return a.precio - b.precio;
      if (orden === 'precio-desc') return b.precio - a.precio;
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es');
      return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    });
    return lista;
  });

  protected readonly asadosFiltrados = computed(() => {
    const q = normalizar(this.busqueda().trim());
    if (!q) return this.asados;
    return this.asados.filter((p) =>
      normalizar(`${p.nombre} ${p.descripcion ?? ''} ${(p.etiquetas ?? []).join(' ')}`).includes(q),
    );
  });

  protected readonly adicionesFiltradas = computed(() => this.filtrarExtras(this.adiciones));
  protected readonly bebidasFiltradas = computed(() => this.filtrarExtras(this.bebidas));

  private filtrarExtras(items: ExtraItem[]): ExtraItem[] {
    const q = normalizar(this.busqueda().trim());
    if (!q) return items;
    return items.filter((it) => normalizar(it.nombre).includes(q));
  }

  protected readonly buscando = computed(() => this.busqueda().trim().length > 0);

  protected readonly hayFiltros = computed(
    () => this.buscando() || this.chip() !== null || this.orden() !== 'reco',
  );

  protected readonly totalResultados = computed(
    () =>
      this.platosFiltrados().length +
      (this.buscando()
        ? this.asadosFiltrados().length + this.adicionesFiltradas().length + this.bebidasFiltradas().length
        : 0),
  );

  seleccionarChip(etiqueta: string, ev: Event): void {
    this.chip.set(etiqueta);
    (ev.currentTarget as HTMLElement | null)?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    });
  }

  limpiar(): void {
    this.busqueda.set('');
    this.chip.set(null);
    this.orden.set('reco');
  }

  trackDish = (_: number, d: Dish) => d.id;
}
