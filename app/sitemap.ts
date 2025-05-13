import { getBaseUrl } from "@/lib/utils"

export default async function sitemap() {
  const baseUrl = getBaseUrl()

  // Rutas principales del sitio
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/#marcas`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/#productos`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/#nosotros`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/#contacto`,
      lastModified: new Date().toISOString(),
    },
  ]

  return routes
}
