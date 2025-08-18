export interface GeoLocation {
  ip: string
  city: string
  region: string
  country: string
  country_code: string
  latitude: number
  longitude: number
}

/**
 * Obtiene la geolocalización basada en la dirección IP
 * @param ip Dirección IP (opcional, si no se proporciona se usa la IP del cliente)
 * @returns Datos de geolocalización
 */
export async function getGeoLocation(ip?: string): Promise<GeoLocation | null> {
  try {
    // En un entorno de desarrollo o si hay problemas con la API, usar datos simulados
    if (process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") {
      return getSimulatedGeoLocation(ip)
    }

    // Usamos ip-api.com que ofrece un plan gratuito con límite de 45 solicitudes por minuto
    const apiUrl = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/"

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      // Importante: esto debe ejecutarse en el servidor
      cache: "no-store", // No cachear para obtener datos actualizados
    })

    if (!response.ok) {
      console.error(`Error en la API de geolocalización: ${response.status}`)
      return getSimulatedGeoLocation(ip)
    }

    const data = await response.json()

    // Verificar si la respuesta contiene un error
    if (data.error) {
      console.error("Error en la API de geolocalización:", data.error || data.reason)
      return getSimulatedGeoLocation(ip)
    }

    // Transformar la respuesta al formato que necesitamos
    return {
      ip: data.ip || ip || "0.0.0.0",
      city: data.city || "Desconocido",
      region: data.region || data.region_name || "Desconocido",
      country: data.country_name || data.country || "Desconocido",
      country_code: data.country_code || "XX",
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
    }
  } catch (error) {
    console.error("Error obteniendo geolocalización:", error)
    // En caso de error, devolver datos simulados
    return getSimulatedGeoLocation(ip)
  }
}

/**
 * Genera datos de geolocalización simulados
 * Útil para desarrollo o cuando la API no está disponible
 */
function getSimulatedGeoLocation(ip?: string): GeoLocation {
  // Lista de ubicaciones simuladas para desarrollo
  const simulatedLocations = [
    {
      city: "Buenos Aires",
      region: "Buenos Aires",
      country: "Argentina",
      country_code: "AR",
      latitude: -34.6037,
      longitude: -58.3816,
    },
    {
      city: "Bahía Blanca",
      region: "Buenos Aires",
      country: "Argentina",
      country_code: "AR",
      latitude: -38.7196,
      longitude: -62.2724,
    },
    {
      city: "Madrid",
      region: "Madrid",
      country: "España",
      country_code: "ES",
      latitude: 40.4168,
      longitude: -3.7038,
    },
    {
      city: "Ciudad de México",
      region: "CDMX",
      country: "México",
      country_code: "MX",
      latitude: 19.4326,
      longitude: -99.1332,
    },
    {
      city: "Santiago",
      region: "Región Metropolitana",
      country: "Chile",
      country_code: "CL",
      latitude: -33.4489,
      longitude: -70.6693,
    },
  ]

  // Seleccionar una ubicación aleatoria
  const randomLocation = simulatedLocations[Math.floor(Math.random() * simulatedLocations.length)]

  return {
    ip: ip || `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    ...randomLocation,
  }
}

/**
 * Obtiene la bandera del país basada en el código de país
 * @param countryCode Código ISO del país (2 letras)
 * @returns URL de la imagen de la bandera
 */
export function getCountryFlag(countryCode: string): string {
  // Usamos la API de flagcdn.com para obtener banderas
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
}

/**
 * Agrupa ubicaciones por país para estadísticas
 * @param locations Array de ubicaciones
 * @returns Objeto con conteo por país
 */
export function groupLocationsByCountry(locations: GeoLocation[]): Record<string, number> {
  return locations.reduce(
    (acc, location) => {
      const country = location.country || "Desconocido"
      acc[country] = (acc[country] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
}
