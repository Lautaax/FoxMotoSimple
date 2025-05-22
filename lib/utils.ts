import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getBaseUrl as getBaseUrlFromUtils, getAbsoluteUrl as getAbsoluteUrlFromUtils } from "./url-utils"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-exportar las funciones de url-utils para mantener compatibilidad
export const getBaseUrl = getBaseUrlFromUtils
export const getAbsoluteUrl = getAbsoluteUrlFromUtils

// Exportar otras utilidades generales aquí
