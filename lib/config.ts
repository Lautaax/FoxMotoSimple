/**
 * Configuración centralizada de la aplicación
 * Este archivo contiene todas las configuraciones relacionadas con URLs, entornos y dominios
 */

// Tipos de entorno soportados
export type Environment = "development" | "staging" | "production" | "test"

// Configuración específica para cada entorno
interface EnvironmentConfig {
  baseUrl: string
  apiUrl: string
  assetsUrl: string
  isHttpsEnabled: boolean
  allowedDomains: string[]
}

// Configuración por defecto para cada entorno
const environmentConfigs: Record<Environment, EnvironmentConfig> = {
  development: {
    baseUrl: "http://localhost:3000",
    apiUrl: "http://localhost:3000/api",
    assetsUrl: "http://localhost:3000",
    isHttpsEnabled: false,
    allowedDomains: ["localhost", "127.0.0.1"],
  },
  staging: {
    baseUrl: "https://staging.foxmotorepuestos.com",
    apiUrl: "https://staging.foxmotorepuestos.com/api",
    assetsUrl: "https://staging-assets.foxmotorepuestos.com",
    isHttpsEnabled: true,
    allowedDomains: ["staging.foxmotorepuestos.com", "staging-assets.foxmotorepuestos.com"],
  },
  production: {
    baseUrl: "https://www.foxmotorepuestos.com",
    apiUrl: "https://www.foxmotorepuestos.com/api",
    assetsUrl: "https://www.foxmotorepuestos.com",
    isHttpsEnabled: true,
    allowedDomains: ["foxmotorepuestos.com", "www.foxmotorepuestos.com"],
  },
  test: {
    baseUrl: "http://test.local",
    apiUrl: "http://test.local/api",
    assetsUrl: "http://test.local",
    isHttpsEnabled: false,
    allowedDomains: ["test.local"],
  },
}

// Determinar el entorno actual
export function getCurrentEnvironment(): Environment {
  // En el navegador
  if (typeof window !== "undefined") {
    // Verificar si estamos en un entorno de prueba
    if (
      window.location.hostname === "test.local" ||
      window.location.hostname.includes("test") ||
      window.location.search.includes("test-mode=true")
    ) {
      return "test"
    }

    // Verificar si estamos en un entorno de staging
    if (window.location.hostname.includes("staging")) {
      return "staging"
    }

    // Verificar si estamos en localhost o desarrollo
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes(".local")
    ) {
      return "development"
    }

    // Por defecto, asumir producción
    return "production"
  }

  // En el servidor
  const nodeEnv = process.env.NODE_ENV || "development"
  const vercelEnv = process.env.VERCEL_ENV || ""

  if (nodeEnv === "test" || vercelEnv === "test") {
    return "test"
  }

  if (nodeEnv === "development" || vercelEnv === "development") {
    return "development"
  }

  if (vercelEnv === "preview") {
    return "staging"
  }

  if (nodeEnv === "production" || vercelEnv === "production") {
    return "production"
  }

  return "development"
}

// Obtener la configuración para el entorno actual
export function getEnvironmentConfig(): EnvironmentConfig {
  const environment = getCurrentEnvironment()

  // Obtener la configuración base para el entorno
  const config = environmentConfigs[environment]

  // Sobrescribir con variables de entorno si están definidas
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    config.baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    config.apiUrl = process.env.NEXT_PUBLIC_API_URL
  }

  if (process.env.NEXT_PUBLIC_ASSETS_URL) {
    config.assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL
  }

  return config
}

// Exportar la configuración actual para facilitar su uso
export const config = getEnvironmentConfig()
