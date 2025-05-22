/**
 * Genera un nombre de archivo SEO-friendly para imágenes
 * @param title Título o descripción de la imagen
 * @param suffix Sufijo opcional (ej: tamaño, variante)
 * @param extension Extensión del archivo (por defecto webp)
 * @returns Nombre de archivo optimizado para SEO
 */
export function generateSeoFilename(title: string, suffix?: string, extension = "webp"): string {
  // Convertir a minúsculas y reemplazar caracteres especiales
  let filename = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Mantener solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones

  // Añadir sufijo si existe
  if (suffix) {
    filename += `-${suffix.toLowerCase().replace(/\s+/g, "-")}`
  }

  return `${filename}.${extension}`
}

/**
 * Genera un texto alternativo SEO-friendly para imágenes
 * @param context Contexto principal de la imagen (ej: "cadena de moto")
 * @param brand Marca relacionada (opcional)
 * @param model Modelo relacionado (opcional)
 * @param location Ubicación relacionada (opcional)
 * @returns Texto alternativo optimizado para SEO
 */
export function generateSeoAltText(context: string, brand?: string, model?: string, location = "Bahía Blanca"): string {
  let altText = context

  if (brand) {
    altText += ` ${brand}`
  }

  if (model) {
    altText += ` ${model}`
  }

  // Añadir el nombre del negocio y ubicación para mejorar SEO local
  altText += ` | Fox Motorepuestos ${location}`

  return altText
}

/**
 * Genera tamaños responsivos para el atributo "sizes" de Next.js Image
 * @param defaultSize Tamaño por defecto (ej: 100vw)
 * @param breakpoints Objeto con breakpoints y tamaños correspondientes
 * @returns String formateado para el atributo sizes
 */
export function generateResponsiveSizes(defaultSize = "100vw", breakpoints?: Record<string, string>): string {
  if (!breakpoints || Object.keys(breakpoints).length === 0) {
    return defaultSize
  }

  const breakpointEntries = Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${breakpoint}) ${size}`)
    .join(", ")

  return `${breakpointEntries}, ${defaultSize}`
}

/**
 * Determina si una imagen debe cargarse con prioridad
 * @param index Índice de la imagen en una lista
 * @param isHero Si la imagen es un hero o imagen principal
 * @param isVisible Si la imagen está visible inicialmente sin scroll
 * @returns Boolean indicando si debe cargarse con prioridad
 */
export function shouldPrioritizeImage(index = 0, isHero = false, isVisible = false): boolean {
  // Priorizar imágenes hero o las primeras imágenes visibles
  return isHero || index === 0 || isVisible
}

/**
 * Genera una URL para una imagen de placeholder basada en el contexto
 * @param width Ancho del placeholder
 * @param height Alto del placeholder
 * @param category Categoría o contexto de la imagen
 * @returns URL del placeholder
 */
export function generatePlaceholderUrl(width = 800, height = 600, category = "moto"): string {
  return `/placeholder.svg?width=${width}&height=${height}&text=${encodeURIComponent(category)}`
}

/**
 * Obtiene dimensiones óptimas para diferentes contextos de imagen
 * @param context Contexto donde se usará la imagen
 * @returns Objeto con ancho y alto recomendados
 */
export function getOptimalImageDimensions(
  context: "hero" | "thumbnail" | "gallery" | "product" | "blog" | "avatar" = "blog",
): { width: number; height: number } {
  const dimensions = {
    hero: { width: 1920, height: 1080 },
    thumbnail: { width: 400, height: 300 },
    gallery: { width: 800, height: 600 },
    product: { width: 600, height: 600 },
    blog: { width: 1200, height: 675 },
    avatar: { width: 150, height: 150 },
  }

  return dimensions[context]
}

/**
 * Genera metadatos completos para una imagen
 * @param params Parámetros para los metadatos
 * @returns Objeto con todos los metadatos necesarios para SEO
 */
export function generateImageMetadata({
  title,
  context,
  brand,
  model,
  location = "Bahía Blanca",
  category,
  isHero = false,
  index = 0,
}: {
  title: string
  context: string
  brand?: string
  model?: string
  location?: string
  category?: "hero" | "thumbnail" | "gallery" | "product" | "blog" | "avatar"
  isHero?: boolean
  index?: number
}) {
  const imageCategory = category || (isHero ? "hero" : "blog")
  const dimensions = getOptimalImageDimensions(imageCategory)

  return {
    filename: generateSeoFilename(title),
    alt: generateSeoAltText(context, brand, model, location),
    width: dimensions.width,
    height: dimensions.height,
    priority: shouldPrioritizeImage(index, isHero),
    placeholder: generatePlaceholderUrl(dimensions.width, dimensions.height, context),
    sizes: generateResponsiveSizes(),
  }
}
