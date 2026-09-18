import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { EMPRESA } from '../../data/empresa.config';
import { Dish, ExtraItem } from '../../models/dish';
import { estaAbierto, textoHorarioHoy } from '../../utils/horario';
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
  imports: [FormsModule, DishSection, ExtraList],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {
  private readonly menu = inject(MenuService);

  protected readonly CHIP_RECO = CHIP_RECO;
  protected readonly empresa = EMPRESA;
  protected readonly abierta = computed(() => estaAbierto(EMPRESA.horario));
  protected readonly horarioHoy = computed(() => textoHorarioHoy(EMPRESA.horario));

  protected readonly categoriaArroces = this.menu.getCategoria('arroces');
  protected readonly categoriaComidasRapidas = this.menu.getCategoria('comidas-rapidas');

  private readonly arroces = this.menu.getPorCategoria('arroces');
  private readonly comidasRapidas = this.menu.getPorCategoria('comidas-rapidas');
  private readonly asados = this.menu.getPorCategoria('asados');
  private readonly adiciones = this.menu.getAdiciones();
  private readonly bebidas = this.menu.getBebidas();

  // ---- Estado de los filtros ----
  protected readonly busqueda = signal('');
  protected readonly chip = signal<string | null>(null); // null = Todos
  protected readonly orden = signal<Orden>('reco');

  /** Chips disponibles = etiquetas presentes en toda la carta. */
  protected readonly chips = computed(() => {
    const set = new Set<string>();
    for (const p of [...this.arroces, ...this.comidasRapidas, ...this.asados]) {
      (p.etiquetas ?? []).forEach((e) => set.add(e));
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'es'));
  });

  protected readonly arrocesFiltrados = computed(() => this.filtrarPlatos(this.arroces));
  protected readonly comidasRapidasFiltradas = computed(() => this.filtrarPlatos(this.comidasRapidas));
  protected readonly asadosFiltrados = computed(() => this.filtrarPlatos(this.asados));
  protected readonly adicionesFiltradas = computed(() => this.filtrarExtras(this.adiciones));
  protected readonly bebidasFiltradas = computed(() => this.filtrarExtras(this.bebidas));

  private filtrarPlatos(lista: Dish[]): Dish[] {
    const q = normalizar(this.busqueda().trim());
    const chip = this.chip();
    const chipValido = chip === CHIP_RECO || (chip !== null && this.chips().includes(chip));

    let filtrada = lista.filter((p) => {
      if (q && !normalizar(`${p.nombre} ${p.descripcion ?? ''} ${(p.etiquetas ?? []).join(' ')}`).includes(q)) {
        return false;
      }
      if (chipValido && chip === CHIP_RECO && !p.destacado) return false;
      if (chipValido && chip !== CHIP_RECO && !(p.etiquetas ?? []).includes(chip!)) return false;
      return true;
    });

    const orden = this.orden();
    filtrada = [...filtrada].sort((a, b) => {
      if (orden === 'precio-asc') return a.precio - b.precio;
      if (orden === 'precio-desc') return b.precio - a.precio;
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre, 'es');
      return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    });
    return filtrada;
  }

  private filtrarExtras(items: ExtraItem[]): ExtraItem[] {
    const q = normalizar(this.busqueda().trim());
    if (!q) return items;
    return items.filter((it) => normalizar(it.nombre).includes(q));
  }

  protected readonly buscando = computed(() => this.busqueda().trim().length > 0);

  protected readonly hayFiltros = computed(
    () => this.buscando() || this.chip() !== null || this.orden() !== 'reco',
  );

  protected readonly sinResultados = computed(
    () =>
      this.arrocesFiltrados().length === 0 &&
      this.comidasRapidasFiltradas().length === 0 &&
      this.asadosFiltrados().length === 0,
  );

  protected readonly totalResultados = computed(
    () =>
      this.arrocesFiltrados().length +
      this.comidasRapidasFiltradas().length +
      this.asadosFiltrados().length +
      (this.buscando()
        ? this.adicionesFiltradas().length + this.bebidasFiltradas().length
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
