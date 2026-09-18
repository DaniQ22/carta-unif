# Carta unificada — Caribe Wok & Pamer

Una sola app Angular 20 con **un único menú**: arroces al wok, comidas
rápidas, asados y bebidas, todo en una sola página, con un solo carrito y
un solo horario de atención. El pedido se arma en WhatsApp y se envía a la
cocina responsable (ver "Cómo funciona el pedido" más abajo).

> Este proyecto es independiente de `carta-caribe-wok` y `carta-rm` (los dos
> repos de una sola línea cada uno). No los reemplaza ni los modifica.

Diseño 100% responsive (móvil, tablet y escritorio). Precios en pesos
colombianos. Cocina oculta — solo servicio a domicilio.

## Arrancar en local

```bash
npm install
npm start
```

Abre http://localhost:4200 — verás la carta completa directamente en `/`.

## Compilar para producción

```bash
npm run build
```

El sitio queda en `dist/carta-unificada/browser/`. Es 100% estático: se
puede subir a Netlify, Vercel, GitHub Pages, Firebase Hosting, etc.

## Configuración

### 1. Negocio y horario — `src/app/data/empresa.config.ts`

`EMPRESA` tiene los datos del negocio (nombre, logo, moneda, saludo de
WhatsApp, cobertura de delivery) y el horario único de atención:

```ts
horario: {
  defecto: { abre: '11:00', cierra: '23:00' },
},
```

`horario.excepciones` acepta días concretos (`0`=domingo … `6`=sábado;
`null` = cerrado).

`COCINAS` define las dos cocinas que preparan el pedido y su WhatsApp — ver
la sección "Cómo funciona el pedido".

### 2. El menú — `src/app/data/menu.data.ts`

- **`PLATOS`**: cada plato tiene `categoria: 'arroces'`, `'comidas-rapidas'`
  o `'asados'` (asados se preparan en la cocina de Pamer).
- **`ADICIONES`** y **`BEBIDAS`**: se muestran igual para todo el menú.

Los campos de cada plato (`precio`, `imagen`, `etiquetas`, `ingredientes`,
`variantes`, etc.) funcionan igual que en los proyectos de una sola línea —
ver sus README para el detalle de cada campo.

### 3. Logos e imágenes

Van en `public/img/`. Cambia una foto reemplazando el archivo con el mismo
nombre.

#### Fotos de los arroces

Los arroces se dejaron **sin `imagen`** a propósito: en producción, las
fotos son lo que más tarda en cargar (peso del archivo + una petición de
red por plato), y es la sección con más platos de la carta. Sin `imagen`,
la tarjeta muestra automáticamente las iniciales del plato sobre un fondo
degradado — cero peso, carga instantánea, sin "salto" de layout mientras
carga.

Si más adelante quieres traer las fotos de vuelta sin repetir el problema
de velocidad:

1. **Comprime y redimensiona antes de subir**: ~600–800px de ancho (no hace
   falta más para una tarjeta de carta) y formato **WebP** o **AVIF**, que
   pesan una fracción de un JPG al mismo tamaño visual. Herramientas como
   Squoosh (squoosh.app) o TinyPNG hacen esto en segundos, gratis.
2. Sirve las imágenes con **CDN + caché fuerte** (Netlify/Vercel/Cloudflare
   ya lo hacen solas para todo lo que esté en `public/`), para que solo
   pesen la primera vez que cada cliente entra.
3. El código ya usa `loading="lazy"` en las fotos de las tarjetas, así que
   solo se descargan las que el cliente realmente llega a ver al hacer
   scroll — no hace falta tocar nada ahí.
4. Si igual notas demora, agrega las fotos de a poco (por ejemplo, solo a
   los 2-3 arroces `destacado: true`) en vez de a los 12 platos de una vez.

En resumen: dejar `imagen` vacío (como está ahora) es la opción más rápida
posible porque no descarga nada; comprimir a WebP/AVIF chico es la mejor
alternativa si prefieres mostrar fotos igual.

## Cómo funciona el pedido

1. El cliente arma un único carrito con platos, adiciones y bebidas de
   cualquier sección del menú.
2. Escribe una nota por ítem y sus datos de domicilio: nombre, teléfono y
   dirección (obligatorios) + referencia opcional.
3. Al enviar el pedido se abre WhatsApp con un solo mensaje, ya redactado,
   con todo el detalle del pedido.
4. Ese mensaje se dirige a la cocina responsable, según `COCINAS` en
   `empresa.config.ts`:
   - Si el pedido incluye **algún arroz**, va al WhatsApp de **Caribe Wok**.
   - Si no (solo comidas rápidas, asados, adiciones y/o bebidas), va al
     WhatsApp de **Pamer**.
5. El carrito se guarda en el navegador (`localStorage`, clave
   `carta-unificada-carrito`).

## Estructura

```
src/app/
  data/            empresa.config.ts (negocio + cocinas) y menu.data.ts (menú)
  models/          tipos TypeScript (Dish, ExtraItem, CartItem, CocinaConfig)
  services/        MenuService y CartService
  pipes/           precio (formato $ 00.000)
  components/      site-header, dish-card, dish-section, extra-list, cart-drawer, dish-detail
  pages/           menu-page (la carta completa)
  utils/           horario (abierto/cerrado), moneda (formato de precio) y cocina (a qué cocina va cada plato)
  app.routes.ts    '/' — el menú unificado
```
