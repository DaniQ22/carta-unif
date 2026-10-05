import { EMPRESA } from '../data/empresa.config';

/**
 * Construye la URL de una imagen alojada en Cloudinary (plan free) con
 * optimización automática de formato/calidad y un ancho fijo, para no
 * repetir esos parámetros en cada `imagen` de `menu.data.ts`.
 *
 * Uso: `imagen: cloudinaryUrl('hamburguesa-clasica')` — el argumento es el
 * "public ID" con el que subiste la foto a Cloudinary (por defecto, el
 * nombre del archivo sin extensión).
 */
export function cloudinaryUrl(publicId: string, anchoPx = 700): string {
  const cloudName = EMPRESA.cloudinaryCloudName;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${anchoPx},f_auto,q_auto/${publicId}`;
}

/**
 * `srcset` para una URL generada con `cloudinaryUrl`: el navegador elige el
 * ancho según la pantalla (en móvil baja ~3 veces menos). Devuelve `null`
 * para URLs que no son de Cloudinary, que no admiten transformaciones.
 */
export function cloudinarySrcset(url: string, anchos = [400, 700]): string | null {
  if (!/^https:\/\/res\.cloudinary\.com\/.+\/w_\d+,/.test(url)) return null;
  return anchos.map((w) => `${url.replace(/\/w_\d+,/, `/w_${w},`)} ${w}w`).join(', ');
}

/** Quita la extensión de video si el Public ID la trae (ej: 'wok.mp4' → 'wok'). */
function sinExtensionVideo(publicId: string): string {
  return publicId.replace(/\.(mp4|mov|webm|m4v)$/i, '');
}

/**
 * URL de un video de Cloudinary: formato según el navegador (`f_auto`),
 * calidad automática y ancho fijo, para no servir el archivo original del celular.
 */
export function cloudinaryVideoUrl(publicId: string, anchoPx = 720): string {
  const cloudName = EMPRESA.cloudinaryCloudName;
  return `https://res.cloudinary.com/${cloudName}/video/upload/w_${anchoPx},f_auto,q_auto/${sinExtensionVideo(publicId)}`;
}

/** Portada del video: el primer fotograma como imagen (`so_0`), la genera Cloudinary. */
export function cloudinaryVideoPoster(publicId: string, anchoPx = 720): string {
  const cloudName = EMPRESA.cloudinaryCloudName;
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_0,w_${anchoPx},q_auto/${sinExtensionVideo(publicId)}.jpg`;
}
