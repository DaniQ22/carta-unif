# Carta unificada — Caribe Wok & RM

Una sola app Angular 20 con **selector de línea de marca**: el cliente elige
entre **Caribe Wok** (arroces al wok) y **RM** (comidas rápidas + asados)
al entrar, y desde ahí navega su carta con carrito propio y envío directo
al WhatsApp del cocinero de esa línea.

> Este proyecto es independiente de `carta-caribe-wok` y `carta-rm` (los dos
> repos de una sola línea cada uno). No los reemplaza ni los modifica.

Diseño 100% responsive (móvil, tablet y escritorio). Precios en pesos
colombianos. Cocina oculta — solo servicio a domicilio.

## Arrancar en local

```bash
npm install
npm start
```

Abre http://localhost:4200 — verás la pantalla selectora (`/`). Elegir una
tarjeta navega a `/wok` o `/comidas-rapidas`.

## Compilar para producción

```bash
npm run build
```

El sitio queda en `dist/carta-unificada/browser/`. Es 100% estático: se
puede subir a Netlify, Vercel, GitHub Pages, Firebase Hosting, etc.

## Configuración

### 1. Líneas de marca — `src/app/data/lineas.config.ts`

`EMPRESA` tiene los datos compartidos (moneda, saludo de WhatsApp, cobertura
de delivery). `LINEAS` tiene la config de cada línea:

```ts
arroces: {
  id: 'arroces',
  ruta: 'wok',                 // segmento de URL: /wok
  nombre: 'Caribe Wok',
  eslogan: 'Arroces al wok con sabor caribeño',
  logo: 'img/logo-caribe-wok.png',
  colorAcento: '#1fc2b5',       // color de la tarjeta en el selector
  whatsappCocinero: '573024533723',
  horario: { defecto: { abre: '11:00', cierra: '22:00' } },
},
```

`horario.excepciones` acepta días concretos (`0`=domingo … `6`=sábado;
`null` = cerrado).

### 2. El menú — `src/app/data/menu.data.ts`

- **`PLATOS`**: cada plato tiene `categoria: 'arroces' | 'comidas-rapidas'`
  (a qué línea pertenece) o `categoria: 'asados'` (grupo transversal). Los
  platos de `asados` pueden restringirse a una línea con `lineas: ['comidas-rapidas']`
  — si se omite, se muestran en ambas.
- **`ADICIONES`**: llevan `linea: 'arroces' | 'comidas-rapidas'` (son
  distintas por línea). Si se omite `linea`, es transversal.
- **`BEBIDAS`**: sin campo `linea` → se muestran igual en ambas cartas.

Los campos de cada plato (`precio`, `imagen`, `etiquetas`, `ingredientes`,
etc.) funcionan igual que en los proyectos de una sola línea — ver sus
README para el detalle de cada campo.

### 3. Logos e imágenes

Van en `public/img/`. Incluye los logos y fotos de ambas líneas. Cambia una
foto reemplazando el archivo con el mismo nombre.

## Cómo funciona el pedido

1. El cliente elige su línea en la pantalla inicial (`/`).
2. Arma el carrito con platos, adiciones y bebidas de esa línea — **cada
   línea tiene su propio carrito**, independiente de la otra.
3. Escribe una nota por ítem y sus datos de domicilio: nombre, teléfono y
   dirección (obligatorios) + referencia opcional.
4. Al enviar el pedido se abre WhatsApp con el mensaje ya redactado,
   dirigido al número del cocinero de esa línea.
5. Los carritos se guardan en el navegador (`localStorage`, clave
   `carta-unificada-carritos`, un carrito por línea).

## Estructura

```
src/app/
  data/            lineas.config.ts (líneas + negocio) y menu.data.ts (menú)
  models/          tipos TypeScript (Dish, ExtraItem, CartItem, LineaConfig)
  services/        LineaService (línea activa), MenuService y CartService
  pipes/           precio (formato $ 00.000)
  components/      site-header, dish-card, dish-section, extra-list, cart-drawer, dish-detail
  pages/           selector-page (elegir línea) y menu-page (la carta)
  utils/           horario (abierto/cerrado) y moneda (formato de precio)
  app.routes.ts    '/' selector, '/wok' y '/comidas-rapidas' las cartas
```
