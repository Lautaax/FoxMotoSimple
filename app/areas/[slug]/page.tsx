import type { Metadata } from "next"
import { getCanonicalUrl } from "@/lib/url-utils"
import AreaPageClient from "./AreaPageClient"
import { areaData } from "./areaData"

// Tipos para los parámetros
type Props = {
  params: { slug: string }
}

// Generar metadatos dinámicos para cada página de área
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const area = areaData[slug as keyof typeof areaData]

  if (!area) {
    return {
      title: "Área no encontrada | Fox Motorepuestos",
      description: "La página que estás buscando no existe.",
    }
  }

  const baseUrl = getCanonicalUrl()

  return {
    title: area.title,
    description: area.description,
    alternates: {
      canonical: `/areas/${slug}`,
    },
    openGraph: {
      title: area.title,
      description: area.description,
      url: `${baseUrl}/areas/${slug}`,
      siteName: "Fox Motorepuestos",
      locale: "es_AR",
      type: "website",
    },
  }
}

// Generar rutas estáticas para todas las áreas
export async function generateStaticParams() {
  return Object.keys(areaData).map((slug) => ({
    slug,
  }))
}

export default function AreaPage({ params }: Props) {
  return <AreaPageClient params={params} />
}
