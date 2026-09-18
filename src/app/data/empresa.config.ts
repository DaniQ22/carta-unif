import { CocinaConfig, CocinaId, HorarioSemana } from '../models/cocina';

/**
 * Datos generales del negocio y horario único de atención.
 * ------------------------------------------------------------------
 * EDITA AQUÍ la moneda, los textos generales y el horario. Un solo menú,
 * un solo horario para todo (arroces, comidas rápidas, asados y bebidas).
 * `horario.defecto` aplica todos los días salvo que agregues una excepción
 * en `excepciones` (0=domingo … 6=sábado, `null` = cerrado).
 */
export const EMPRESA = {
  nombre: 'Caribe Wok & Pamer',
  eslogan: 'Arroces, comidas rápidas y asados a domicilio',
  logo: 'img/logo-pamer.jpg',

  /** Símbolo de moneda que se antepone a los precios. */
  moneda: '$',

  /** Texto opcional que se agrega al inicio del mensaje de WhatsApp. */
  saludoPedido: '¡Hola! Quiero hacer un pedido a domicilio 🛵',

  /** Cocina oculta: solo se atiende delivery, no hay recojo en local. */
  soloDelivery: true,

  /** Zona de cobertura que se muestra al cliente (edítalo o déjalo vacío ''). */
  coberturaDelivery: 'Domicilios en toda la ciudad',

  horario: {
    defecto: { abre: '11:00', cierra: '23:00' },
  } satisfies HorarioSemana as HorarioSemana,
};

/**
 * Cocinas que preparan el pedido. El menú y el carrito son uno solo, pero
 * el pedido se envía por WhatsApp al número de la cocina responsable:
 * - Si el pedido incluye algún plato de `arroces`, va a Caribe Wok.
 * - Si no (solo comidas rápidas, asados, adiciones y/o bebidas), va a Pamer.
 */
export const COCINAS: Record<CocinaId, CocinaConfig> = {
  arroces: {
    id: 'arroces',
    nombre: 'Caribe Wok',
    whatsapp: '573024533723',
  },
  'comidas-rapidas': {
    id: 'comidas-rapidas',
    nombre: 'Pamer',
    whatsapp: '573024533735',
  },
};
