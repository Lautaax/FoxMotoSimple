import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para obtener la URL base del sitio
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // En el navegador, usa la URL actual
    return window.location.origin
  }

  // En el servidor, usa el dominio principal
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.foxmotorepuestos.com"
}

// Función para construir URLs absolutas
export function getAbsoluteUrl(path: string) {
  const baseUrl = getBaseUrl()
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}
