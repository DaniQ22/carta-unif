import { LineaConfig, LineaId } from '../models/linea';

/**
 * Datos generales del negocio (compartidos por ambas líneas).
 * ------------------------------------------------------------------
 * EDITA AQUÍ la moneda y los textos generales.
 */
export const EMPRESA = {
  /** Símbolo de moneda que se antepone a los precios. */
  moneda: '$',

  /** Texto opcional que se agrega al inicio del mensaje de WhatsApp. */
  saludoPedido: '¡Hola! Quiero hacer un pedido a domicilio 🛵',

  /** Cocina oculta: solo se atiende delivery, no hay recojo en local. */
  soloDelivery: true,

  /** Zona de cobertura que se muestra al cliente (edítalo o déjalo vacío ''). */
  coberturaDelivery: 'Domicilios en toda la ciudad',
};

/**
 * Configuración de cada línea de marca.
 * ------------------------------------------------------------------
 * `horario.defecto` aplica todos los días salvo que agregues una
 * excepción en `excepciones` (0=domingo … 6=sábado, `null` = cerrado).
 */
export const LINEAS: Record<LineaId, LineaConfig> = {
  arroces: {
    id: 'arroces',
    ruta: 'wok',
    nombre: 'Caribe Wok',
    eslogan: 'Arroces al wok con sabor caribeño',
    logo: 'img/logo-caribe-wok.png',
    colorAcento: '#1fc2b5',
    whatsappCocinero: '573024533723',
    horario: {
      defecto: { abre: '11:00', cierra: '22:00' },
    },
  },
  'comidas-rapidas': {
    id: 'comidas-rapidas',
    ruta: 'comidas-rapidas',
    nombre: 'RM',
    eslogan: 'El arte del sabor al instante',
    logo: 'img/logo-rm.png',
    colorAcento: '#ff7a18',
    whatsappCocinero: '573024533735',
    horario: {
      defecto: { abre: '11:00', cierra: '23:00' },
    },
  },
};

/** Lista de líneas en el orden en que se muestran en el selector. */
export const LISTA_LINEAS: LineaConfig[] = [LINEAS.arroces, LINEAS['comidas-rapidas']];
