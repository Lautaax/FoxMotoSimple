import { config, getCurrentEnvironment } from "./config"

/**
 * Normaliza una URL asegurándose de que tenga el formato correcto
 * @param url URL a normalizar
 * @returns URL normalizada
 */
export function normalizeUrl(url: string): string {
  // Eliminar espacios en blanco
  let normalizedUrl = url.trim()

  // Verificar si la URL ya tiene un protocolo
  const hasProtocol = /^https?:\/\//i.test(normalizedUrl)

  // Si no tiene protocolo y no es una ruta relativa, añadir el protocolo adecuado
  if (!hasProtocol && !normalizedUrl.startsWith("/")) {
    normalizedUrl = config.isHttpsEnabled ? `https://${normalizedUrl}` : `http://${normalizedUrl}`
  }

  // Eliminar barras diagonales duplicadas (excepto en el protocolo)
  normalizedUrl = normalizedUrl.replace(/([^:]\/)\/+/g, "$1")

  // Eliminar barra diagonal al final si existe
  if (normalizedUrl.endsWith("/")) {
    normalizedUrl = normalizedUrl.slice(0, -1)
  }

  return normalizedUrl
}

/**
 * Valida si una URL es segura y está permitida
 * @param url URL a validar
 * @returns true si la URL es segura, false en caso contrario
 */
export function isUrlSafe(url: string): boolean {
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)

    // Verificar si el dominio está en la lista de dominios permitidos
    return config.allowedDomains.some((domain) => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`))
  } catch (error) {
    // Si no se puede parsear la URL, no es segura
    return false
  }
}

/**
 * Obtiene la URL base del sitio según el entorno
 * @returns URL base normalizada
 */
export function getBaseUrl(): string {
  // Si estamos en el navegador, usar la URL actual
  if (typeof window !== "undefined") {
    const { protocol, host } = window.location
    return `${protocol}//${host}`
  }

  // En el servidor, usar la configuración según el entorno
  return normalizeUrl(config.baseUrl)
}

/**
 * Construye una URL absoluta a partir de una ruta relativa
 * @param path Ruta relativa (con o sin barra inicial)
 * @returns URL absoluta
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = getBaseUrl()
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}

/**
 * Obtiene la URL para recursos estáticos (imágenes, archivos, etc.)
 * @param path Ruta del recurso
 * @returns URL absoluta al recurso
 */
export function getAssetUrl(path: string): string {
  const assetsUrl = normalizeUrl(config.assetsUrl)
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${assetsUrl}${normalizedPath}`
}

/**
 * Obtiene la URL para llamadas a la API
 * @param endpoint Endpoint de la API (sin barra inicial)
 * @returns URL absoluta al endpoint de la API
 */
export function getApiUrl(endpoint: string): string {
  const apiUrl = normalizeUrl(config.apiUrl)
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.substring(1) : endpoint
  return `${apiUrl}/${normalizedEndpoint}`
}

/**
 * Determina si la aplicación se está ejecutando en modo de desarrollo
 * @returns true si está en desarrollo, false en caso contrario
 */
export function isDevelopment(): boolean {
  return getCurrentEnvironment() === "development"
}

/**
 * Determina si la aplicación se está ejecutando en modo de producción
 * @returns true si está en producción, false en caso contrario
 */
export function isProduction(): boolean {
  return getCurrentEnvironment() === "production"
}

/**
 * Genera una URL canónica para SEO
 * @param path Ruta relativa (opcional)
 * @returns URL canónica completa
 */
export function getCanonicalUrl(path?: string): string {
  // En producción, siempre usar www
  if (isProduction()) {
    const productionUrl = "https://www.foxmotorepuestos.com"
    if (!path || path === "/") {
      return productionUrl
    }
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    return `${productionUrl}${normalizedPath}`
  }

  // En otros entornos, usar la URL base
  return path ? getAbsoluteUrl(path) : getBaseUrl()
}
