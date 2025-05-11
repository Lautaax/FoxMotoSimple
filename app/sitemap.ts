import { getBaseUrl } from "@/lib/utils"

export default async function sitemap() {
  const baseUrl = getBaseUrl()

  // Rutas principales del sitio
  const routes = ["", "#marcas", "#productos", "#nosotros", "#contacto"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
