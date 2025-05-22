import { getCanonicalUrl } from "@/lib/url-utils"

export default async function sitemap() {
  const baseUrl = getCanonicalUrl()

  // Áreas locales para SEO
  const localAreas = [
    "bahia-blanca",
    "punta-alta",
    "ingeniero-white",
    "general-daniel-cerri",
    "villa-bordeu",
    "cabildo",
    "villa-espora",
    "villa-harding-green",
  ]

  // Categorías de productos (simuladas)
  const productCategories = [
    "cadenas-transmision",
    "neumaticos",
    "aceites-lubricantes",
    "accesorios",
    "frenos",
    "baterias",
    "filtros",
    "escapes",
  ]

  // Marcas (simuladas)
  const brands = ["far", "the-orange", "osaca", "did", "choho", "metzeler", "motul", "wander"]

  // Rutas principales del sitio
  const mainRoutes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#marcas`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#productos`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#nosotros`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contacto`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Rutas de áreas locales
  const areaRoutes = localAreas.map((area) => ({
    url: `${baseUrl}/areas/${area}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  // Rutas de categorías de productos (para futuro)
  const categoryRoutes = productCategories.map((category) => ({
    url: `${baseUrl}/productos/${category}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 0.8,
  }))

  // Rutas de marcas (para futuro)
  const brandRoutes = brands.map((brand) => ({
    url: `${baseUrl}/marcas/${brand}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  // Rutas legales y de información
  const infoRoutes = [
    {
      url: `${baseUrl}/terminos-condiciones`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-privacidad`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/preguntas-frecuentes`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/envios-devoluciones`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  return [...mainRoutes, ...areaRoutes, ...categoryRoutes, ...brandRoutes, ...infoRoutes]
}
