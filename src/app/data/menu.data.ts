import { Category, Dish, ExtraItem } from '../models/dish';
import { cloudinaryUrl } from '../utils/cloudinary';

/**
 * Datos del menú unificado (precios en pesos colombianos). Un solo menú,
 * un solo horario — ver `EMPRESA.horario` en `empresa.config.ts`.
 * ------------------------------------------------------------------
 * - PLATOS: cada plato tiene `categoria: 'arroces'`, `'comidas-rapidas'` o
 *   el grupo transversal `'asados'`. Esa categoría también decide a qué
 *   cocina/WhatsApp se enruta el pedido (ver `utils/cocina.ts`): arroces va
 *   a Caribe Wok, el resto va a Pamer.
 * - ADICIONES y BEBIDAS: se muestran igual para todo el menú.
 * - `etiquetas`: alimentan los chips de filtro de la carta. Usa los
 *   mismos textos entre platos para que se agrupen (ej: 'Hamburguesas').
 * - `ingredientes`: se muestran en el detalle del producto (al tocar la
 *   tarjeta). Edítalos para reflejar la receta real de cada plato.
 * Las fotos están en `public/img/`. Reemplaza el archivo con el mismo
 * nombre para cambiar una foto. Si dejas `imagen` vacío, la tarjeta
 * muestra las iniciales del plato en vez de una foto — sin descargar nada,
 * así que carga instantáneo. Los arroces se dejaron así a propósito (ver
 * el README, sección "Fotos de los arroces").
 * - `variantes`: tamaños seleccionables (Familiar/Entero/Medio) con su
 *   propio precio; `precio` queda como el de la variante más barata (Medio),
 *   la que se selecciona por defecto en la tarjeta.
 *
 * Precios actualizados el 2026-09-28 desde `precios/caribe wok.pdf` (arroces
 * y especialidades del wok) y `precios/precios.txt` (comidas rápidas y
 * adiciones), en la raíz del repo.
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
    descripcion: 'Arroz salteado con pollo, chorizo, lomito, plátano maduro y queso.',
    precio: 30000,
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 85000 },
      { id: 'entero', nombre: 'Entero', precio: 45000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    destacado: true,
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Chorizo', 'Lomito', 'Plátano maduro', 'Queso', 'Cebollín', 'Vegetales', 'Salsas de la casa'],
  },
  {
    id: 'arr-montanero',
    categoria: 'arroces',
    nombre: 'Arroz Montañero',
    descripcion: 'Arroz con pollo, chorizo, lomito, chicharrón y maíz tierno.',
    precio: 30000,
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 85000 },
      { id: 'entero', nombre: 'Entero', precio: 45000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    destacado: true,
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Chorizo', 'Lomito', 'Chicharrón', 'Maíz', 'Plátano', 'Cebollín', 'Vegetales', 'Salsas de la casa'],
  },
  {
    id: 'arr-de-la-casa',
    categoria: 'arroces',
    nombre: 'Arroz de la Casa',
    descripcion: 'Arroz con pollo, lomo de cerdo, chorizo, carne desmechada y maíz.',
    precio: 30000,
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 85000 },
      { id: 'entero', nombre: 'Entero', precio: 50000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Lomo de cerdo', 'Chorizo', 'Carne desmechada', 'Maíz', 'Cebollín chino', 'Vegetales', 'Salsas de la casa'],
  },
  {
    id: 'arr-mixto',
    categoria: 'arroces',
    nombre: 'Arroz Mixto',
    descripcion: 'Arroz salteado con pollo y lomito, cebollín y vegetales.',
    precio: 29000,
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 85000 },
      { id: 'entero', nombre: 'Entero', precio: 49000 },
      { id: 'medio', nombre: 'Medio', precio: 29000 },
    ],
    etiquetas: ['De la casa'],
    ingredientes: ['Arroz', 'Pollo', 'Lomito', 'Cebollín', 'Vegetales', 'Salsas de la casa'],
  },

  // ---------- ARROCES CHINOS ----------
  {
    id: 'arr-chino-especial',
    categoria: 'arroces',
    nombre: 'Arroz Chino Especial',
    descripcion: 'Al wok con pollo, cerdo, salchichón, camarón, raíz china y huevo.',
    precio: 30000,
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 90000 },
      { id: 'entero', nombre: 'Entero', precio: 50000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    destacado: true,
    etiquetas: ['Chinos', 'Con camarón'],
    ingredientes: ['Arroz', 'Pollo', 'Salchichón', 'Lomito', 'Camarón', 'Raíz china', 'Cebollín', 'Huevo', 'Salsas de la casa'],
  },
  {
    id: 'arr-chino-pollo-camaron',
    categoria: 'arroces',
    nombre: 'Arroz Chino de Pollo y Camarón',
    descripcion: 'Al wok con pollo, camarón, raíz china y huevo.',
    precio: 30000,
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 85000 },
      { id: 'entero', nombre: 'Entero', precio: 45000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    etiquetas: ['Chinos', 'Con camarón'],
    ingredientes: ['Arroz', 'Pollo', 'Camarón', 'Raíz china', 'Cebollín', 'Huevo', 'Salsas de la casa'],
  },
  {
    id: 'arr-chino-mixto',
    categoria: 'arroces',
    nombre: 'Arroz Chino Mixto',
    descripcion: 'Al wok con pollo, lomito, salchichón, raíz china y huevo.',
    precio: 30000,
    imagen: cloudinaryUrl('ChatGPT_Image_28_sept_2026_10_28_29.png'),
    variantes: [
      { id: 'familiar', nombre: 'Familiar', precio: 85000 },
      { id: 'entero', nombre: 'Entero', precio: 45000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    etiquetas: ['Chinos'],
    ingredientes: ['Arroz', 'Pollo', 'Lomito', 'Salchichón', 'Raíz china', 'Cebollín', 'Huevo', 'Salsas de la casa'],
  },

  // ---------- ESPECIALIDADES DEL WOK ----------
  {
    id: 'wok-pollo-naranja',
    categoria: 'arroces',
    nombre: 'Pollo a la Naranja',
    descripcion: 'Pechuga apanada en panko, bañada en salsa de naranja y ajonjolí.',
    precio: 30000,
    variantes: [
      { id: 'entero', nombre: 'Entero', precio: 48000 },
      { id: 'medio', nombre: 'Medio', precio: 30000 },
    ],
    etiquetas: ['Especialidades'],
    ingredientes: ['Pechuga de pollo', 'Salsa de naranja', 'Panko', 'Ajonjolí'],
  },
  {
    id: 'wok-alitas-bbq',
    categoria: 'arroces',
    nombre: 'Alitas en Salsa BBQ',
    descripcion: 'Alitas de pollo en salsa BBQ con ajonjolí y papas a la francesa.',
    precio: 25000,
    variantes: [
      { id: 'entero', nombre: 'Entero', precio: 46000 },
      { id: 'medio', nombre: 'Medio', precio: 25000 },
    ],
    etiquetas: ['Especialidades'],
    ingredientes: ['Alitas de pollo', 'Salsa BBQ', 'Ajonjolí', 'Papa a la francesa'],
  },
  {
    id: 'wok-costillas-bbq',
    categoria: 'arroces',
    nombre: 'Costillas en Salsa BBQ',
    descripcion: 'Costillas en salsa BBQ con ajonjolí, papas a la francesa y ensalada.',
    precio: 44000,
    etiquetas: ['Especialidades'],
    ingredientes: ['Costilla (500 g)', 'Salsa BBQ', 'Ajonjolí', 'Papa a la francesa', 'Ensalada'],
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
  // COMIDAS RÁPIDAS (Pamer)
  // ======================================================
  // ---------- DESGRANADOS ----------
  {
    id: 'cr-desgranado-pollo',
    categoria: 'comidas-rapidas',
    nombre: 'Desgranado de Pollo',
    descripcion: 'Pollo a la parrilla, papas a la francesa, maíz tierno, queso costeño y papa ripio.',
    precio: 26500,
    etiquetas: ['Desgranados'],
    ingredientes: ['Pollo a la parrilla (200 g)', 'Papa a la francesa', 'Lechuga fresca', 'Maíz tierno', 'Queso costeño', 'Papa ripio', 'Salsas'],
  },
  {
    id: 'cr-desgranado-mixto',
    categoria: 'comidas-rapidas',
    nombre: 'Desgranado Mixto',
    descripcion: 'Pechuga de pollo y lomo fino de cerdo, papas, maíz tierno, queso costeño y papa ripio.',
    precio: 27000,
    etiquetas: ['Desgranados'],
    ingredientes: ['Pechuga de pollo', 'Lomo fino de cerdo', 'Papa a la francesa', 'Lechuga', 'Maíz tierno', 'Queso costeño', 'Papa ripio', 'Salsas'],
  },
  {
    id: 'cr-desgranado',
    categoria: 'comidas-rapidas',
    nombre: 'Desgranado de la Casa',
    descripcion: 'Pollo, lomo de cerdo, chorizo, butifarra y costilla BBQ, con maíz, queso costeño y gratinado.',
    precio: 29000,
    imagen: cloudinaryUrl('ChatGPT_Image_Sep_18_2026_06_10_10_PM'),
    destacado: true,
    etiquetas: ['Desgranados'],
    ingredientes: [
      'Pechuga de pollo',
      'Lomo de cerdo',
      'Chorizo',
      'Butifarra',
      'Costilla BBQ',
      'Lechuga fresca',
      'Maíz tierno',
      'Queso costeño',
      'Queso gratinado',
      'Papa ripio',
      'Salsas',
    ],
  },
  {
    id: 'cr-plato-suizo',
    categoria: 'comidas-rapidas',
    nombre: 'Plato Suizo',
    descripcion: 'Pechuga de pollo, salchicha suiza, papas a la francesa, queso costeño y papa ripio.',
    precio: 29000,
    etiquetas: ['Desgranados'],
    ingredientes: ['Pechuga de pollo', 'Salchicha suiza', 'Papa a la francesa', 'Lechuga', 'Queso costeño', 'Papa ripio', 'Salsas'],
  },

  // ---------- SALCHIPAPAS ----------
  {
    id: 'cr-salchipapa',
    categoria: 'comidas-rapidas',
    nombre: 'Salchipapa',
    descripcion: 'Papa a la francesa, salchicha, lechuga, queso costeño, papa ripio y salsas.',
    precio: 18000,
    imagen: 'img/salchipapa.jpg',
    etiquetas: ['Salchipapas'],
    ingredientes: ['Salchicha', 'Papa a la francesa', 'Lechuga', 'Queso costeño', 'Papa ripio', 'Salsas'],
  },
  {
    id: 'cr-choripapa',
    categoria: 'comidas-rapidas',
    nombre: 'Choripapa',
    descripcion: 'Papa a la francesa con chorizo, lechuga, queso costeño, papa ripio y salsas.',
    precio: 21000,
    etiquetas: ['Salchipapas'],
    ingredientes: ['Chorizo', 'Papa a la francesa', 'Lechuga', 'Queso costeño', 'Papa ripio', 'Salsas'],
  },

  // ---------- HAMBURGUESAS ----------
  {
    id: 'cr-hamburguesa-clasica',
    categoria: 'comidas-rapidas',
    nombre: 'Hamburguesa Clásica',
    descripcion: 'Carne de res 130 g en pan brioche, queso cheddar, tocineta crujiente y vegetales.',
    precio: 18500,
    imagen: 'img/hamburguesa-clasica.jpg',
    destacado: true,
    etiquetas: ['Hamburguesas'],
    ingredientes: ['Pan brioche', 'Carne de res (130 g)', 'Queso cheddar', 'Tocineta crujiente', 'Vegetales', 'Salsa'],
  },
  {
    id: 'cr-hamburguesa-doble',
    categoria: 'comidas-rapidas',
    nombre: 'Hamburguesa Doble Carne',
    descripcion: 'Doble carne de res (200 g), cheddar, mozzarella, tocineta y cebolla grillé.',
    precio: 26500,
    imagen: 'img/hamburguesa-royal.jpg',
    destacado: true,
    etiquetas: ['Hamburguesas'],
    ingredientes: [
      'Pan brioche',
      'Doble carne de res (200 g)',
      'Queso cheddar',
      'Queso mozzarella',
      'Tocineta',
      'Lechuga cogollo',
      'Cebolla grillé',
      'Salsa',
    ],
  },
  {
    id: 'cr-chori-burguer',
    categoria: 'comidas-rapidas',
    nombre: 'Chori Burguer',
    descripcion: 'Carne de res y chorizo a la parrilla, cheddar, mozzarella y cebolla caramelizada.',
    precio: 25500,
    etiquetas: ['Hamburguesas'],
    ingredientes: [
      'Pan brioche',
      'Carne de res (130 g)',
      'Chorizo a la parrilla',
      'Queso cheddar',
      'Queso mozzarella',
      'Lechuga cogollo',
      'Cebolla caramelizada',
      'Papa ripio',
      'Salsa',
    ],
  },

  // ---------- SÁNDWICHES ----------
  {
    id: 'cr-sandwich-pollo-tocineta',
    categoria: 'comidas-rapidas',
    nombre: 'Sándwich de Pollo y Tocineta',
    descripcion: 'Pan artesanal, pechuga, tocineta, mozzarella y manzana caramelizada, con papas.',
    precio: 25500,
    etiquetas: ['Sándwiches'],
    ingredientes: [
      'Pan artesanal',
      'Pechuga de pollo',
      'Tocineta',
      'Cebolla grillé',
      'Queso mozzarella',
      'Manzana caramelizada',
      'Salsas',
      'Papa a la francesa',
    ],
  },
  {
    id: 'cr-sandwich-lomo-cerdo',
    categoria: 'comidas-rapidas',
    nombre: 'Sándwich de Lomo de Cerdo',
    descripcion: 'Pan artesanal, lomo de cerdo, jamón, manzana verde y mozzarella, con papas.',
    precio: 27000,
    etiquetas: ['Sándwiches'],
    ingredientes: ['Pan artesanal', 'Lomo de cerdo', 'Jamón', 'Manzana verde', 'Queso mozzarella', 'Salsas', 'Papa a la francesa'],
  },
  {
    id: 'cr-sandwich-lomo-res',
    categoria: 'comidas-rapidas',
    nombre: 'Sándwich de Lomo de Res',
    descripcion: 'Pan artesanal con lomo de res, queso mozzarella y salsas, con papas a la francesa.',
    precio: 29000,
    etiquetas: ['Sándwiches'],
    ingredientes: ['Pan artesanal', 'Lomo de res', 'Queso mozzarella', 'Salsas', 'Papa a la francesa'],
  },

  // ---------- PERROS ----------
  {
    id: 'cr-perro-clasico',
    categoria: 'comidas-rapidas',
    nombre: 'Perro Clásico',
    descripcion: 'Pan artesanal, salchicha long, lechuga, queso costeño, papa ripio y salsa.',
    precio: 13500,
    etiquetas: ['Perros'],
    ingredientes: ['Pan artesanal', 'Salchicha long', 'Lechuga', 'Queso costeño', 'Papa ripio', 'Salsa'],
  },
  {
    id: 'cr-perro-suizo',
    categoria: 'comidas-rapidas',
    nombre: 'Perro Suizo',
    descripcion: 'Pan artesanal, salchicha suiza, mozzarella, tocineta, lechuga y papa ripio.',
    precio: 23500,
    etiquetas: ['Perros'],
    ingredientes: ['Pan artesanal', 'Salchicha suiza', 'Lechuga', 'Queso mozzarella', 'Tocineta', 'Papa ripio', 'Salsa'],
  },
  {
    id: 'cr-perro-pm',
    categoria: 'comidas-rapidas',
    nombre: 'Perro de la Casa',
    descripcion: 'Pan artesanal, salchicha long, jamón, tocineta, mozzarella y papa ripio.',
    precio: 22000,
    imagen: 'img/hot-dog.jpg',
    destacado: true,
    etiquetas: ['Perros'],
    ingredientes: ['Pan artesanal', 'Salchicha long', 'Jamón', 'Tocineta', 'Queso mozzarella', 'Lechuga', 'Papa ripio', 'Salsa'],
  },
  {
    id: 'cr-chori-perro',
    categoria: 'comidas-rapidas',
    nombre: 'Chori Perro',
    descripcion: 'Pan artesanal con chorizo, chimichurri, mozzarella, lechuga y papa ripio.',
    precio: 23500,
    etiquetas: ['Perros'],
    ingredientes: ['Pan artesanal', 'Chorizo', 'Lechuga', 'Chimichurri', 'Queso mozzarella', 'Papa ripio', 'Salsa'],
  },

  // ---------- PATACONES ----------
  {
    id: 'cr-patacon-carne',
    categoria: 'comidas-rapidas',
    nombre: 'Patacón con Carne',
    descripcion: 'Patacón con carne, hogao, queso costeño, mozzarella y papa ripio.',
    precio: 25500,
    etiquetas: ['Patacones'],
    ingredientes: ['Patacón', 'Carne', 'Hogao', 'Queso costeño', 'Queso mozzarella', 'Papa ripio', 'Salsa'],
  },
  {
    id: 'cr-patacon-mixto',
    categoria: 'comidas-rapidas',
    nombre: 'Patacón Mixto',
    descripcion: 'Patacón con pollo y carne desmenuzados, hogao, quesos y tocineta.',
    precio: 26500,
    etiquetas: ['Patacones'],
    ingredientes: ['Patacón', 'Pollo desmenuzado', 'Carne desmenuzada', 'Hogao', 'Queso costeño', 'Queso mozzarella', 'Tocineta', 'Salsa'],
  },
  {
    id: 'cr-patacon-especial',
    categoria: 'comidas-rapidas',
    nombre: 'Patacón Especial',
    descripcion: 'Patacón con pollo y carne desmenuzados, chorizo, hogao, mozzarella y papa ripio.',
    precio: 28000,
    etiquetas: ['Patacones'],
    ingredientes: ['Patacón', 'Pollo desmenuzado', 'Carne desmenuzada', 'Chorizo', 'Hogao', 'Queso mozzarella', 'Papa ripio', 'Salsa'],
  },

  // ---------- ALITAS ----------
  {
    id: 'cr-alitas',
    categoria: 'comidas-rapidas',
    nombre: 'Alitas',
    descripcion: 'Alitas de pollo con papas a la francesa. Salsa: BBQ, miel mostaza, corozo o tamarindo.',
    precio: 29500,
    imagen: cloudinaryUrl('ChatGPT_Image_Sep_18_2026_05_34_38_PM'),
    etiquetas: ['Pollo'],
    ingredientes: ['Alitas de pollo', 'Papa a la francesa', 'Salsa de la casa', 'BBQ tradicional, miel mostaza, BBQ corozo o BBQ de tamarindo'],
  },

  // ---------- NO ESTÁN EN precios/precios.txt ----------
  // TODO: confirmar si siguen en la carta; conservan su precio anterior.
  {
    id: 'cr-hamburguesa-pm',
    categoria: 'comidas-rapidas',
    nombre: 'Hamburguesa Pamer Especial',
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
    id: 'cr-salchipapa-pm',
    categoria: 'comidas-rapidas',
    nombre: 'Salchipapa Pamer',
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
    id: 'cr-shawarma',
    categoria: 'comidas-rapidas',
    nombre: 'Shawarma Pamer',
    descripcion: 'Carne al carbón, pan pita, vegetales frescos y salsa blanca de la casa.',
    precio: 17000,
    imagen: 'img/shawarma.jpg',
    etiquetas: ['Shawarma'],
    ingredientes: ['Pan pita', 'Carne al carbón', 'Lechuga', 'Tomate', 'Cebolla', 'Salsa blanca de la casa'],
  },
  {
    id: 'cr-picada',
    categoria: 'comidas-rapidas',
    nombre: 'Picada Pamer (para compartir)',
    descripcion: 'Carne, pollo, chorizo, costilla, chicharrón, papa y maduro. 2–3 personas.',
    precio: 45000,
    imagen: 'img/picada.jpg',
    etiquetas: ['Para compartir'],
    ingredientes: ['Carne de res', 'Pollo', 'Chorizo', 'Costilla de cerdo', 'Chicharrón', 'Papa criolla', 'Maduro frito'],
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
  // ASADOS (van a la cocina de Pamer — ver `utils/cocina.ts`)
  // ======================================================
  {
    id: 'asa-churrasco',
    categoria: 'asados',
    nombre: 'Churrasco a la Parrilla',
    descripcion: 'Corte de res asado al carbón, con papa criolla, ensalada y chimichurri.',
    precio: 32000,
    etiquetas: ['A la parrilla', 'Con carne'],
    ingredientes: ['Churrasco de res', 'Papa criolla asada', 'Ensalada fresca', 'Chimichurri'],
  },
  {
    id: 'asa-pechuga',
    categoria: 'asados',
    nombre: 'Pechuga a la Plancha',
    descripcion: 'Pechuga de pollo marinada y asada, con arroz y ensalada.',
    precio: 19000,
    etiquetas: ['A la parrilla', 'Con pollo'],
    ingredientes: ['Pechuga de pollo', 'Arroz blanco', 'Ensalada fresca', 'Salsa de la casa'],
  },
  {
    id: 'asa-costillas',
    categoria: 'asados',
    nombre: 'Costillas BBQ',
    descripcion: 'Costillas de cerdo ahumadas, bañadas en salsa BBQ, con papa criolla.',
    precio: 28000,
    etiquetas: ['A la parrilla', 'Con carne'],
    ingredientes: ['Costillas de cerdo', 'Salsa BBQ', 'Papa criolla', 'Ensalada fresca'],
  },
  {
    id: 'asa-chuleta',
    categoria: 'asados',
    nombre: 'Chuleta Ahumada',
    descripcion: 'Chuleta de cerdo a la parrilla, con papa a la francesa y ensalada.',
    precio: 24000,
    etiquetas: ['A la parrilla', 'Con carne'],
    ingredientes: ['Chuleta de cerdo', 'Papa a la francesa', 'Ensalada fresca'],
  },
  {
    id: 'asa-mixto',
    categoria: 'asados',
    nombre: 'Mixto de Asados (para compartir)',
    descripcion: 'Churrasco, pechuga, chorizo y costilla a la parrilla. 2–3 personas.',
    precio: 48000,
    destacado: true,
    etiquetas: ['A la parrilla', 'Para compartir'],
    ingredientes: ['Churrasco', 'Pechuga de pollo', 'Chorizo', 'Costilla de cerdo', 'Papa criolla', 'Ensalada fresca'],
  },
];

/** Adiciones — mismas proteínas/papas para todo el menú. */
export const ADICIONES: ExtraItem[] = [
  { id: 'ad-pollo-naranja', grupo: 'adiciones', nombre: 'Pollo a la naranja', precio: 8000 },
  { id: 'ad-alitas', grupo: 'adiciones', nombre: 'Alitas', precio: 8000 },
  { id: 'ad-costilla', grupo: 'adiciones', nombre: 'Costilla', precio: 10000 },
  { id: 'ad-camaron', grupo: 'adiciones', nombre: 'Camarón', precio: 10000 },
  { id: 'ad-platano', grupo: 'adiciones', nombre: 'Plátano', precio: 5000 },
  { id: 'ad-papa-casco', grupo: 'adiciones', nombre: 'Papa casco', precio: 7000 },
  { id: 'ad-papa-francesa', grupo: 'adiciones', nombre: 'Papa a la francesa', precio: 6000 },
  { id: 'ad-queso-costeno', grupo: 'adiciones', nombre: 'Queso costeño', precio: 5000 },
  { id: 'ad-queso-mozzarella', grupo: 'adiciones', nombre: 'Queso mozzarella', precio: 5000 },
  { id: 'ad-tocineta', grupo: 'adiciones', nombre: 'Tocineta', precio: 4500 },
  { id: 'ad-patacones', grupo: 'adiciones', nombre: 'Patacones', precio: 5000 },
  { id: 'ad-ensalada', grupo: 'adiciones', nombre: 'Ensalada', precio: 5000 },
];

/**
 * Bebidas — mismas para todo el menú. Precios actualizados el 2026-09-30
 * desde la foto de la lista de precios en `precios/` (raíz del repo).
 */
export const BEBIDAS: ExtraItem[] = [
  { id: 'be-coca-cola-15', grupo: 'bebidas', nombre: 'Coca-Cola 1.5 L', precio: 12000 },
  { id: 'be-coca-cola-p400', grupo: 'bebidas', nombre: 'Coca-Cola personal (400 ml)', precio: 5000 },
  { id: 'be-quatro-15', grupo: 'bebidas', nombre: 'Quatro 1.5 L', precio: 12000 },
  { id: 'be-quatro-p400', grupo: 'bebidas', nombre: 'Quatro personal (400 ml)', precio: 5000 },
  { id: 'be-uva-postobon-15', grupo: 'bebidas', nombre: 'Uva Postobón 1.5 L', precio: 12000 },
  { id: 'be-colombiana-15', grupo: 'bebidas', nombre: 'Colombiana 1.5 L', precio: 12000 },
  { id: 'be-manzana-15', grupo: 'bebidas', nombre: 'Manzana Postobón 1.5 L', precio: 12000 },
  { id: 'be-agua-manzana-15', grupo: 'bebidas', nombre: 'Agua saborizada (manzana) 1.5 L', precio: 12000 },
  { id: 'be-te-durazno', grupo: 'bebidas', nombre: 'Té de durazno', precio: 5000 },
  { id: 'be-te-limon', grupo: 'bebidas', nombre: 'Té de limón', precio: 5000 },
  { id: 'be-agua-cristal', grupo: 'bebidas', nombre: 'Agua Cristal', precio: 3000 },
];
