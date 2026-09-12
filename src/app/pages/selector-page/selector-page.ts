import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EMPRESA, LISTA_LINEAS } from '../../data/lineas.config';
import { LineaConfig } from '../../models/linea';
import { LineaService } from '../../services/linea.service';
import { estaAbierto, textoHorarioHoy } from '../../utils/horario';

@Component({
  selector: 'app-selector-page',
  imports: [RouterLink],
  templateUrl: './selector-page.html',
  styleUrl: './selector-page.scss',
})
export class SelectorPage {
  protected readonly empresa = EMPRESA;
  protected readonly lineas = LISTA_LINEAS;

  constructor(private lineaSvc: LineaService) {
    // Volver al selector "des-elige" la línea activa (oculta header/carrito/footer).
    this.lineaSvc.limpiar();
  }

  abierta(linea: LineaConfig): boolean {
    return estaAbierto(linea.horario);
  }

  horarioHoy(linea: LineaConfig): string {
    return textoHorarioHoy(linea.horario);
  }
}
