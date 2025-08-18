import { getCanonicalUrl } from "./url-utils"

// Tipos para los datos de Google Analytics
export interface AnalyticsPageView {
  pagePath: string
  pageTitle: string
  pageViews: number
  uniquePageViews: number
  avgTimeOnPage: number
  bounceRate: number
}

export interface AnalyticsTrafficSource {
  source: string
  medium: string
  sessions: number
  percentOfTotal: number
}

export interface AnalyticsDeviceCategory {
  deviceCategory: string
  sessions: number
  percentOfTotal: number
}

export interface AnalyticsUserMetrics {
  totalUsers: number
  newUsers: number
  returningUsers: number
  avgSessionDuration: number
  sessionsPerUser: number
}

export interface AnalyticsGeoData {
  country: string
  region: string
  city: string
  users: number
  percentOfTotal: number
}

export interface AnalyticsTimelineData {
  date: string
  users: number
  sessions: number
  pageViews: number
}

export interface AnalyticsOverview {
  userMetrics: AnalyticsUserMetrics
  topPages: AnalyticsPageView[]
  trafficSources: AnalyticsTrafficSource[]
  deviceCategories: AnalyticsDeviceCategory[]
  geoData: AnalyticsGeoData[]
  timeline: AnalyticsTimelineData[]
}

/**
 * Inicializa Google Analytics
 * @param measurementId ID de medición de GA4
 */
export function initGoogleAnalytics(measurementId: string) {
  // Evitar duplicar el script si ya existe
  if (typeof window !== "undefined" && !window.gtag) {
    // Añadir el script de Google Analytics
    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.async = true
    document.head.appendChild(script)

    // Inicializar gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", measurementId, {
      page_path: window.location.pathname,
    })
  }
}

/**
 * Envía un evento de página vista a Google Analytics
 * @param path Ruta de la página
 * @param title Título de la página
 */
export function trackPageView(path: string, title: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      page_location: getCanonicalUrl() + path,
    })
  }
}

/**
 * Envía un evento personalizado a Google Analytics
 * @param eventName Nombre del evento
 * @param eventParams Parámetros del evento
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams)
  }
}

/**
 * Obtiene datos simulados de Google Analytics para desarrollo
 * @returns Datos simulados de Google Analytics
 */
export function getSimulatedAnalyticsData(): AnalyticsOverview {
  return {
    userMetrics: {
      totalUsers: 12543,
      newUsers: 8721,
      returningUsers: 3822,
      avgSessionDuration: 185, // en segundos
      sessionsPerUser: 1.4,
    },
    topPages: [
      {
        pagePath: "/",
        pageTitle: "Inicio - Fox Motorepuestos",
        pageViews: 9876,
        uniquePageViews: 7654,
        avgTimeOnPage: 120, // en segundos
        bounceRate: 45.3, // porcentaje
      },
      {
        pagePath: "/productos/cadenas-transmision",
        pageTitle: "Cadenas y Transmisión - Fox Motorepuestos",
        pageViews: 3456,
        uniquePageViews: 2987,
        avgTimeOnPage: 95,
        bounceRate: 38.7,
      },
      {
        pagePath: "/productos/neumaticos",
        pageTitle: "Neumáticos - Fox Motorepuestos",
        pageViews: 2876,
        uniquePageViews: 2345,
        avgTimeOnPage: 110,
        bounceRate: 42.1,
      },
      {
        pagePath: "/contacto",
        pageTitle: "Contacto - Fox Motorepuestos",
        pageViews: 1987,
        uniquePageViews: 1876,
        avgTimeOnPage: 85,
        bounceRate: 35.6,
      },
      {
        pagePath: "/blog",
        pageTitle: "Blog - Fox Motorepuestos",
        pageViews: 1543,
        uniquePageViews: 1321,
        avgTimeOnPage: 145,
        bounceRate: 29.8,
      },
    ],
    trafficSources: [
      { source: "google", medium: "organic", sessions: 6543, percentOfTotal: 45.2 },
      { source: "direct", medium: "none", sessions: 3210, percentOfTotal: 22.1 },
      { source: "facebook.com", medium: "social", sessions: 1876, percentOfTotal: 12.9 },
      { source: "instagram.com", medium: "social", sessions: 1234, percentOfTotal: 8.5 },
      { source: "mercadolibre.com.ar", medium: "referral", sessions: 876, percentOfTotal: 6.0 },
    ],
    deviceCategories: [
      { deviceCategory: "mobile", sessions: 9876, percentOfTotal: 68.2 },
      { deviceCategory: "desktop", sessions: 3987, percentOfTotal: 27.5 },
      { deviceCategory: "tablet", sessions: 621, percentOfTotal: 4.3 },
    ],
    geoData: [
      { country: "Argentina", region: "Buenos Aires", city: "Bahía Blanca", users: 5432, percentOfTotal: 43.3 },
      { country: "Argentina", region: "Buenos Aires", city: "Buenos Aires", users: 2345, percentOfTotal: 18.7 },
      { country: "Argentina", region: "Córdoba", city: "Córdoba", users: 987, percentOfTotal: 7.9 },
      { country: "Argentina", region: "Santa Fe", city: "Rosario", users: 765, percentOfTotal: 6.1 },
      { country: "Argentina", region: "Mendoza", city: "Mendoza", users: 543, percentOfTotal: 4.3 },
      { country: "Chile", region: "Región Metropolitana", city: "Santiago", users: 321, percentOfTotal: 2.6 },
      { country: "Uruguay", region: "Montevideo", city: "Montevideo", users: 234, percentOfTotal: 1.9 },
      { country: "España", region: "Madrid", city: "Madrid", users: 123, percentOfTotal: 1.0 },
    ],
    timeline: generateTimelineData(),
  }
}

/**
 * Genera datos simulados de timeline para los últimos 30 días
 */
function generateTimelineData(): AnalyticsTimelineData[] {
  const data: AnalyticsTimelineData[] = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generar valores aleatorios con tendencia creciente
    const baseFactor = 1 + (30 - i) / 60 // Factor que aumenta con el tiempo
    const randomFactor = 0.8 + Math.random() * 0.4 // Factor aleatorio entre 0.8 y 1.2

    // Añadir variación por día de la semana (más tráfico en días laborables)
    const dayOfWeek = date.getDay() // 0 = domingo, 6 = sábado
    const weekdayFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.8 : 1.2

    const users = Math.round(100 * baseFactor * randomFactor * weekdayFactor)
    const sessions = Math.round(users * (1.2 + Math.random() * 0.4)) // Sesiones ligeramente mayores que usuarios
    const pageViews = Math.round(sessions * (2 + Math.random())) // Páginas vistas por sesión entre 2 y 3

    data.push({
      date: date.toISOString().split("T")[0], // Formato YYYY-MM-DD
      users,
      sessions,
      pageViews,
    })
  }

  return data
}

/**
 * Obtiene datos de Google Analytics
 * En una implementación real, esto haría una llamada a la API de Google Analytics
 * @returns Datos de Google Analytics
 */
export async function getAnalyticsData(): Promise<AnalyticsOverview> {
  // En una implementación real, aquí se haría una llamada a la API de Google Analytics
  // Para este ejemplo, usamos datos simulados
  return getSimulatedAnalyticsData()
}
