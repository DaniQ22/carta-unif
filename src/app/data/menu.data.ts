import { Category, Dish, ExtraItem } from '../models/dish';

/**
 * Datos del menú combinado (precios en pesos colombianos).
 * ------------------------------------------------------------------
 * - PLATOS: cada plato pertenece a una línea (`categoria: 'arroces'` para
 *   Caribe Wok, `'comidas-rapidas'` para RM) o al grupo transversal
 *   `'asados'` (con `lineas` opcional para restringirlo a una línea).
 * - ADICIONES: distintas por línea (usa el campo `linea`).
 * - BEBIDAS: transversales — se muestran igual en ambas líneas.
 * - `etiquetas`: alimentan los chips de filtro de la carta. Usa los
 *   mismos textos entre platos para que se agrupen (ej: 'Hamburguesas').
 * - `ingredientes`: se muestran en el detalle del producto (al tocar la
 *   tarjeta). Edítalos para reflejar la receta real de cada plato.
 * Las fotos están en `public/img/`. Reemplaza el archivo con el mismo
 * nombre para cambiar una foto. Si dejas `imagen` vacío, la tarjeta
 * muestra las iniciales del plato.
 */

export const CATEGORIAS: Category[] = [
  {
    id: 'arroces',
    nombre: 'Arroces al Wok',
    descripcion:
      'Arroces al wok y a la olla, salteados a la orden. Pídelos familiar, entero o medio.',
  },
  {
    id: 'comidas-rapidas',
    nombre: 'Comidas Rápidas',
    descripcion: 'Hamburguesas, salchipapas, perros, desgranados y más, recién hechos.',
  },
];

export const PLATOS: Dish[] = [
  // ======================================================
  // ARROCES (Caribe Wok)
  // ======================================================

  // ---------- ARROCES DE LA CASA ----------
  {
    id: 'arr-caribe',
    categoria: 'arroces',
    nombre: 'Arroz Caribe',
    descripcion:
      'Arroz salteado con pollo, chorizo, lomito, plátano maduro y queso. Tamaños: familiar, entero o medio.',
    precio: 32000,
    imagen: 'img/arroz-tapado.jpg',
    destacado: true,
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Chorizo', 'Lomito', 'Plátano maduro', 'Queso', 'Cebollín', 'Vegetales', 'Salsas de la casa'],
  },
  {
    id: 'arr-montanero',
    categoria: 'arroces',
    nombre: 'Arroz Montañero',
    descripcion:
      'Arroz con pollo, chorizo, lomito, chicharrón y maíz tierno. Tamaños: familiar, entero o medio.',
    precio: 32000,
    imagen: 'img/arroz-con-pollo.jpg',
    destacado: true,
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Chorizo', 'Lomito', 'Chicharrón', 'Maíz', 'Cebollín', 'Vegetales', 'Salsas de la casa'],
  },
  {
    id: 'arr-mixto',
    categoria: 'arroces',
    nombre: 'Arroz Mixto',
    descripcion:
      'Arroz salteado con pollo y lomito, cebollín y vegetales. Tamaños: familiar, entero o medio.',
    precio: 30000,
    imagen: 'img/arroz-chaufa-mixto.jpg',
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Lomito', 'Cebollín', 'Vegetales', 'Salsas de la casa'],
  },

  // ---------- ARROCES CHINOS ----------
  {
    id: 'arr-chino-especial',
    categoria: 'arroces',
    nombre: 'Arroz Chino Especial',
    descripcion:
      'Al wok con pollo, cerdo, salchichón, camarón, raíz china y huevo. Tamaños: familiar, entero o medio.',
    precio: 36000,
    imagen: 'img/aeropuerto.jpg',
    destacado: true,
    etiquetas: ['Chinos', 'Con camarón'],
    ingredientes: ['Arroz', 'Pollo', 'Salchichón', 'Lomito', 'Camarón', 'Raíz china', 'Cebollín', 'Huevo', 'Salsas de la casa'],
  },
  {
    id: 'arr-chino-pollo-camaron',
    categoria: 'arroces',
    nombre: 'Arroz Chino de Pollo y Camarón',
    descripcion:
      'Al wok con pollo, camarón, salchichón, raíz china y huevo. Tamaños: familiar, entero o medio.',
    precio: 36000,
    imagen: 'img/chaufa-camaron.jpg',
    etiquetas: ['Chinos', 'Con camarón'],
    ingredientes: ['Arroz', 'Pollo', 'Camarón', 'Salchichón', 'Raíz china', 'Cebollín', 'Huevo', 'Salsas de la casa'],
  },
  {
    id: 'arr-chino-mixto',
    categoria: 'arroces',
    nombre: 'Arroz Chino Mixto',
    descripcion:
      'Al wok con pollo, lomito, salchichón, raíz china y huevo. Tamaños: familiar, entero o medio.',
    precio: 34000,
    imagen: 'img/arroz-chaufa-pollo.jpg',
    etiquetas: ['Chinos'],
    ingredientes: ['Arroz', 'Pollo', 'Lomito', 'Salchichón', 'Raíz china', 'Cebollín', 'Huevo', 'Salsas de la casa'],
  },

  // ---------- COMBOS (arroz individual + proteína a elección) ----------
  {
    id: 'combo-caribe',
    categoria: 'arroces',
    nombre: 'Combo Arroz Caribe',
    descripcion: 'Porción individual de arroz caribe + proteína del día a elección.',
    precio: 19000,
    etiquetas: ['Combos'],
    ingredientes: ['Arroz caribe', 'Chorizo', 'Lomito', 'Pollo', 'Plátano maduro', 'Queso', 'Vegetales', 'Proteína a elección'],
  },
  {
    id: 'combo-montanero',
    categoria: 'arroces',
    nombre: 'Combo Arroz Montañero',
    descripcion: 'Porción individual de arroz montañero + proteína del día a elección.',
    precio: 19000,
    etiquetas: ['Combos'],
    ingredientes: ['Arroz montañero', 'Chorizo', 'Lomito', 'Pollo', 'Chicharrón', 'Maíz', 'Vegetales', 'Proteína a elección'],
  },
  {
    id: 'combo-mixto',
    categoria: 'arroces',
    nombre: 'Combo Arroz Mixto',
    descripcion: 'Porción individual de arroz mixto + proteína del día a elección.',
    precio: 18000,
    etiquetas: ['Combos'],
    ingredientes: ['Arroz mixto', 'Lomito', 'Pollo', 'Vegetales', 'Proteína a elección'],
  },
  {
    id: 'combo-chino-especial',
    categoria: 'arroces',
    nombre: 'Combo Arroz Chino Especial',
    descripcion: 'Porción individual de arroz chino especial + proteína del día a elección.',
    precio: 21000,
    etiquetas: ['Combos', 'Con camarón'],
    ingredientes: ['Arroz', 'Lomito', 'Pollo', 'Camarón', 'Salchichón', 'Raíz china', 'Cebollín', 'Proteína a elección'],
  },
  {
    id: 'combo-chino-mixto',
    categoria: 'arroces',
    nombre: 'Combo Arroz Chino Mixto',
    descripcion: 'Porción individual de arroz chino mixto + proteína del día a elección.',
    precio: 20000,
    etiquetas: ['Combos'],
    ingredientes: ['Arroz', 'Lomito', 'Pollo', 'Salchichón', 'Raíz china', 'Cebollín', 'Proteína a elección'],
  },

  // ======================================================
  // COMIDAS RÁPIDAS (RM)
  // ======================================================
  {
    id: 'cr-hamburguesa-clasica',
    categoria: 'comidas-rapidas',
    nombre: 'Hamburguesa Clásica',
    descripcion: 'Carne 125 g a la parrilla, queso, lechuga, tomate y salsas de la casa.',
    precio: 13000,
    imagen: 'img/hamburguesa-clasica.jpg',
    destacado: true,
    etiquetas: ['Hamburguesas'],
    ingredientes: ['Pan de hamburguesa', 'Carne de res (125 g)', 'Queso', 'Lechuga', 'Tomate', 'Salsas de la casa'],
  },
  {
    id: 'cr-hamburguesa-pm',
    categoria: 'comidas-rapidas',
    nombre: 'Hamburguesa RM Especial',
    descripcion: 'Doble carne, doble queso, tocineta, huevo, cebolla crocante y BBQ.',
    precio: 22000,
    imagen: 'img/hamburguesa-royal.jpg',
    destacado: true,
    etiquetas: ['Hamburguesas'],
    ingredientes: [
      'Pan de hamburguesa',
      'Doble carne de res',
      'Doble queso',
      'Tocineta',
      'Huevo',
      'Cebolla crocante',
      'Salsa BBQ',
    ],
  },
  {
    id: 'cr-salchipapa',
    categoria: 'comidas-rapidas',
    nombre: 'Salchipapa Clásica',
    descripcion: 'Papa a la francesa, salchicha en rodajas y cremas al gusto.',
    precio: 12000,
    imagen: 'img/salchipapa.jpg',
    etiquetas: ['Salchipapas'],
    ingredientes: ['Papa a la francesa', 'Salchicha', 'Salsas (mayonesa, ketchup, rosada)'],
  },
  {
    id: 'cr-salchipapa-pm',
    categoria: 'comidas-rapidas',
    nombre: 'Salchipapa RM',
    descripcion: 'Papa, salchicha, pollo desmechado, chorizo, queso y huevo de codorniz.',
    precio: 19000,
    imagen: 'img/salchipapa-especial.jpg',
    etiquetas: ['Salchipapas'],
    ingredientes: [
      'Papa a la francesa',
      'Salchicha',
      'Pollo desmechado',
      'Chorizo',
      'Queso fundido',
      'Huevo de codorniz',
      'Salsas de la casa',
    ],
  },
  {
    id: 'cr-perro-pm',
    categoria: 'comidas-rapidas',
    nombre: 'Perro Caliente RM',
    descripcion: 'Pan artesanal, salchicha jumbo, tocineta, papitas, queso y salsas.',
    precio: 11000,
    imagen: 'img/hot-dog.jpg',
    destacado: true,
    etiquetas: ['Perros'],
    ingredientes: ['Pan artesanal', 'Salchicha jumbo', 'Tocineta', 'Papitas', 'Queso', 'Salsas de la casa'],
  },
  {
    id: 'cr-desgranado',
    categoria: 'comidas-rapidas',
    nombre: 'Desgranado RM',
    descripcion: 'Maíz tierno, papa, chicharrón, pollo, chorizo, queso y salsas. En vaso.',
    precio: 16000,
    etiquetas: ['Desgranados'],
    ingredientes: ['Maíz tierno desgranado', 'Papa', 'Chicharrón', 'Pollo desmechado', 'Chorizo', 'Queso', 'Salsas'],
  },
  {
    id: 'cr-choripapa',
    categoria: 'comidas-rapidas',
    nombre: 'Choripapa',
    descripcion: 'Papa a la francesa con chorizo santarrosano en rodajas y guacamole.',
    precio: 15000,
    etiquetas: ['Salchipapas'],
    ingredientes: ['Papa a la francesa', 'Chorizo santarrosano', 'Guacamole'],
  },
  {
    id: 'cr-shawarma',
    categoria: 'comidas-rapidas',
    nombre: 'Shawarma RM',
    descripcion: 'Carne al carbón, pan pita, vegetales frescos y salsa blanca de la casa.',
    precio: 17000,
    imagen: 'img/shawarma.jpg',
    etiquetas: ['Shawarma'],
    ingredientes: ['Pan pita', 'Carne al carbón', 'Lechuga', 'Tomate', 'Cebolla', 'Salsa blanca de la casa'],
  },
  {
    id: 'cr-picada',
    categoria: 'comidas-rapidas',
    nombre: 'Picada RM (para compartir)',
    descripcion: 'Carne, pollo, chorizo, costilla, chicharrón, papa y maduro. 2–3 personas.',
    precio: 45000,
    imagen: 'img/picada.jpg',
    etiquetas: ['Para compartir'],
    ingredientes: ['Carne de res', 'Pollo', 'Chorizo', 'Costilla de cerdo', 'Chicharrón', 'Papa criolla', 'Maduro frito'],
  },
  {
    id: 'cr-alitas',
    categoria: 'comidas-rapidas',
    nombre: 'Alitas BBQ (x8)',
    descripcion: 'Ocho alitas glaseadas en BBQ o picante, con papas a la francesa.',
    precio: 23000,
    imagen: 'img/alitas.jpg',
    etiquetas: ['Pollo', 'Para compartir'],
    ingredientes: ['Alitas de pollo (x8)', 'Salsa BBQ o picante', 'Papa a la francesa'],
  },
  {
    id: 'cr-broaster',
    categoria: 'comidas-rapidas',
    nombre: 'Broaster (¼ de pollo)',
    descripcion: 'Presa de pollo apanada y crocante con papas fritas y ensalada.',
    precio: 15000,
    imagen: 'img/broaster.jpg',
    etiquetas: ['Pollo'],
    ingredientes: ['Presa de pollo', 'Apanado crocante', 'Papa a la francesa', 'Ensalada fresca'],
  },

  // ======================================================
  // ASADOS (transversal — hoy solo activo en RM, ver `lineas`)
  // ======================================================
  {
    id: 'asa-churrasco',
    categoria: 'asados',
    lineas: ['comidas-rapidas'],
    nombre: 'Churrasco a la Parrilla',
    descripcion: 'Corte de res asado al carbón, con papa criolla, ensalada y chimichurri.',
    precio: 32000,
    etiquetas: ['A la parrilla', 'Con carne'],
    ingredientes: ['Churrasco de res', 'Papa criolla asada', 'Ensalada fresca', 'Chimichurri'],
  },
  {
    id: 'asa-pechuga',
    categoria: 'asados',
    lineas: ['comidas-rapidas'],
    nombre: 'Pechuga a la Plancha',
    descripcion: 'Pechuga de pollo marinada y asada, con arroz y ensalada.',
    precio: 19000,
    etiquetas: ['A la parrilla', 'Con pollo'],
    ingredientes: ['Pechuga de pollo', 'Arroz blanco', 'Ensalada fresca', 'Salsa de la casa'],
  },
  {
    id: 'asa-costillas',
    categoria: 'asados',
    lineas: ['comidas-rapidas'],
    nombre: 'Costillas BBQ',
    descripcion: 'Costillas de cerdo ahumadas, bañadas en salsa BBQ, con papa criolla.',
    precio: 28000,
    etiquetas: ['A la parrilla', 'Con carne'],
    ingredientes: ['Costillas de cerdo', 'Salsa BBQ', 'Papa criolla', 'Ensalada fresca'],
  },
  {
    id: 'asa-chuleta',
    categoria: 'asados',
    lineas: ['comidas-rapidas'],
    nombre: 'Chuleta Ahumada',
    descripcion: 'Chuleta de cerdo a la parrilla, con papa a la francesa y ensalada.',
    precio: 24000,
    etiquetas: ['A la parrilla', 'Con carne'],
    ingredientes: ['Chuleta de cerdo', 'Papa a la francesa', 'Ensalada fresca'],
  },
  {
    id: 'asa-mixto',
    categoria: 'asados',
    lineas: ['comidas-rapidas'],
    nombre: 'Mixto de Asados (para compartir)',
    descripcion: 'Churrasco, pechuga, chorizo y costilla a la parrilla. 2–3 personas.',
    precio: 48000,
    destacado: true,
    etiquetas: ['A la parrilla', 'Para compartir'],
    ingredientes: ['Churrasco', 'Pechuga de pollo', 'Chorizo', 'Costilla de cerdo', 'Papa criolla', 'Ensalada fresca'],
  },
];

/** Adiciones — transversales: mismas proteínas/papas para ambas líneas. */
export const ADICIONES: ExtraItem[] = [
  { id: 'ad-pollo-naranja', grupo: 'adiciones', nombre: 'Pollo a la naranja', precio: 8000 },
  { id: 'ad-alitas', grupo: 'adiciones', nombre: 'Alitas', precio: 8000 },
  { id: 'ad-costilla', grupo: 'adiciones', nombre: 'Costilla', precio: 10000 },
  { id: 'ad-camaron', grupo: 'adiciones', nombre: 'Camarón', precio: 10000 },
  { id: 'ad-platano', grupo: 'adiciones', nombre: 'Plátano', precio: 5000 },
  { id: 'ad-queso', grupo: 'adiciones', nombre: 'Queso', precio: 6000 },
  { id: 'ad-papa-francesa', grupo: 'adiciones', nombre: 'Papa a la francesa', precio: 7000 },
  { id: 'ad-papa-casco', grupo: 'adiciones', nombre: 'Papa casco', precio: 7000 },
];

/**
 * Bebidas — transversales: mismas para ambas líneas.
 * TODO: faltan los precios reales de "Agua saborizada (manzana)" y
 * "Gaseosa personal (400 ml)" — dejé precios provisionales (el mismo de la
 * Coca-Cola 1.5 L, y el que tenía antes la gaseosa personal). Ajústalos
 * cuando me pases el precio real de cada una.
 */
export const BEBIDAS: ExtraItem[] = [
  { id: 'be-coca-cola-15', grupo: 'bebidas', nombre: 'Coca-Cola 1.5 L', precio: 11000 },
  { id: 'be-agua-saborizada-manzana', grupo: 'bebidas', nombre: 'Agua saborizada (manzana) 1.5 L', precio: 11000 },
  { id: 'be-gaseosa-p400', grupo: 'bebidas', nombre: 'Gaseosa personal (400 ml)', precio: 4000 },
];
