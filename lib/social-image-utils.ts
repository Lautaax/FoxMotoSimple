import { getCanonicalUrl } from "./url-utils"

interface SocialImageMetadata {
  url: string
  width: number
  height: number
  alt: string
  type?: string
}

/**
 * Genera metadatos para imágenes de Open Graph
 * @param params Parámetros para los metadatos
 * @returns Array de objetos con metadatos para Open Graph
 */
export function generateOpenGraphImages({
  title,
  imagePath,
  fallbackImagePath = "/og-image.png",
  width = 1200,
  height = 630,
  alt,
}: {
  title?: string
  imagePath?: string
  fallbackImagePath?: string
  width?: number
  height?: number
  alt?: string
}): SocialImageMetadata[] {
  const baseUrl = getCanonicalUrl()
  const imageSrc = imagePath || fallbackImagePath
  const imageUrl = imageSrc.startsWith("http") ? imageSrc : `${baseUrl}${imageSrc}`
  const imageAlt = alt || title || "Fox Motorepuestos - Repuestos para motos en Bahía Blanca"

  return [
    {
      url: imageUrl,
      width,
      height,
      alt: imageAlt,
      type: "image/jpeg",
    },
  ]
}

/**
 * Genera metadatos para imágenes de Twitter Card
 * @param params Parámetros para los metadatos
 * @returns Array de URLs para Twitter Cards
 */
export function generateTwitterImages({
  imagePath,
  fallbackImagePath = "/og-image.png",
}: {
  imagePath?: string
  fallbackImagePath?: string
}): string[] {
  const baseUrl = getCanonicalUrl()
  const imageSrc = imagePath || fallbackImagePath
  const imageUrl = imageSrc.startsWith("http") ? imageSrc : `${baseUrl}${imageSrc}`

  return [imageUrl]
}

/**
 * Genera una imagen de Open Graph dinámica con el título del artículo
 * @param title Título del artículo o página
 * @param category Categoría del contenido
 * @returns URL de la imagen generada
 */
export function generateDynamicOgImage(title: string, category?: string): string {
  // Esta función simula la generación de una imagen OG dinámica
  // En un entorno real, podrías usar un servicio como Vercel OG Image o similar

  // Codificar los parámetros para la URL
  const params = new URLSearchParams()
  params.append("title", title)
  if (category) {
    params.append("category", category)
  }

  // Devolver la URL de la API que generaría la imagen
  return `/api/og-image?${params.toString()}`
}
