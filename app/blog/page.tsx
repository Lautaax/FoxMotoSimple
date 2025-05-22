import type { Metadata } from "next"
import Link from "next/link"
import { BlogPostCard } from "@/components/blog-post-card"
import { StructuredBreadcrumbs } from "@/components/structured-breadcrumbs"
import { getCanonicalUrl } from "@/lib/url-utils"
import { generateBreadcrumbSchema } from "@/lib/schema"

// Datos simulados para el blog
const blogPosts = [
  {
    title: "Guía completa para elegir la cadena perfecta para tu moto",
    slug: "guia-elegir-cadena-perfecta-moto",
    excerpt:
      "Descubre cómo seleccionar la cadena ideal según el tipo de moto, uso y presupuesto. Comparamos las principales marcas y modelos disponibles en el mercado.",
    coverImage: "/blog/cadenas-moto.jpg",
    date: "15 de mayo, 2023",
    readTime: "8 min de lectura",
    category: "Guías de compra",
    featured: true,
  },
  {
    title: "Cómo cambiar el aceite de tu moto en 10 pasos sencillos",
    slug: "como-cambiar-aceite-moto-10-pasos",
    excerpt:
      "Aprende a realizar el cambio de aceite de tu moto de forma correcta y segura con esta guía paso a paso. Incluye recomendaciones de herramientas y aceites.",
    coverImage: "/blog/cambio-aceite.jpg",
    date: "2 de junio, 2023",
    readTime: "6 min de lectura",
    category: "Tutoriales",
  },
  {
    title: "Las 5 mejores rutas para motos cerca de Bahía Blanca",
    slug: "mejores-rutas-motos-bahia-blanca",
    excerpt:
      "Descubre los mejores recorridos para disfrutar de tu moto en los alrededores de Bahía Blanca. Rutas panorámicas, cafés moteros y consejos de seguridad.",
    coverImage: "/blog/rutas-motos.jpg",
    date: "20 de junio, 2023",
    readTime: "5 min de lectura",
    category: "Local",
  },
  {
    title: "Comparativa: Los 5 mejores aceites para motos 4T del mercado",
    slug: "comparativa-mejores-aceites-motos-4t",
    excerpt:
      "Analizamos en detalle los aceites más recomendados para motores de 4 tiempos. Ventajas, desventajas y recomendaciones según el tipo de moto y uso.",
    coverImage: "/blog/aceites-moto.jpg",
    date: "8 de julio, 2023",
    readTime: "7 min de lectura",
    category: "Comparativas",
  },
  {
    title: "Neumáticos Metzeler vs. Pirelli: ¿Cuál es mejor para tu moto?",
    slug: "neumaticos-metzeler-vs-pirelli",
    excerpt:
      "Comparamos dos de las marcas líderes en neumáticos para motos. Analizamos rendimiento, durabilidad, agarre en mojado y relación calidad-precio.",
    coverImage: "/blog/neumaticos-comparativa.jpg",
    date: "15 de julio, 2023",
    readTime: "9 min de lectura",
    category: "Comparativas",
  },
  {
    title: "Mantenimiento de frenos: todo lo que necesitas saber",
    slug: "mantenimiento-frenos-moto",
    excerpt:
      "Guía completa sobre el mantenimiento del sistema de frenos de tu moto. Aprende a identificar problemas, realizar ajustes básicos y cuándo reemplazar componentes.",
    coverImage: "/blog/frenos-moto.jpg",
    date: "1 de agosto, 2023",
    readTime: "8 min de lectura",
    category: "Tutoriales",
  },
]

// Categorías del blog
const categories = [
  "Todas",
  "Guías de compra",
  "Tutoriales",
  "Comparativas",
  "Noticias",
  "Local",
  "Historias",
  "Preguntas frecuentes",
]

export const metadata: Metadata = {
  title: "Blog de Motos | Consejos y Guías | Fox Motorepuestos",
  description:
    "Encuentra consejos, tutoriales y guías sobre mantenimiento y repuestos para tu moto. Todo el conocimiento que necesitas para cuidar tu motocicleta.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog de Motos | Consejos y Guías | Fox Motorepuestos",
    description:
      "Encuentra consejos, tutoriales y guías sobre mantenimiento y repuestos para tu moto. Todo el conocimiento que necesitas para cuidar tu motocicleta.",
    type: "website",
  },
}

export default function BlogPage() {
  // Generar schema.org para breadcrumbs
  const baseUrl = getCanonicalUrl()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
  ])

  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
      {/* Schema.org para breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Header */}
      <header className="w-full border-b border-[#7A7A7A]/20 bg-[#1C1C1C]">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm">Volver al inicio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          {/* Breadcrumbs */}
          <StructuredBreadcrumbs className="mb-8" />

          {/* Hero del blog */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog de Fox Motorepuestos</h1>
            <p className="mx-auto max-w-[800px] text-[#7A7A7A] md:text-lg">
              Consejos, tutoriales y guías sobre mantenimiento y repuestos para tu moto. Todo el conocimiento que
              necesitas para cuidar tu motocicleta.
            </p>
          </div>

          {/* Filtro de categorías */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex min-w-max gap-2 pb-2">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={
                    category === "Todas" ? "/blog" : `/blog/categoria/${category.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    index === 0
                      ? "bg-[#D32F2F] text-white"
                      : "bg-[#252525] text-[#7A7A7A] hover:bg-[#D32F2F]/10 hover:text-white"
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* Grid de artículos */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogPostCard
                key={index}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                coverImage={post.coverImage}
                date={post.date}
                readTime={post.readTime}
                category={post.category}
                featured={post.featured}
                className={post.featured ? "md:col-span-2" : ""}
              />
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button
                disabled
                className="rounded-md bg-[#252525] px-4 py-2 text-sm text-[#7A7A7A] transition-colors"
                aria-label="Página anterior"
              >
                Anterior
              </button>
              <button className="rounded-md bg-[#D32F2F] px-4 py-2 text-sm text-white transition-colors">1</button>
              <button className="rounded-md bg-[#252525] px-4 py-2 text-sm text-[#7A7A7A] hover:bg-[#D32F2F]/10 hover:text-white transition-colors">
                2
              </button>
              <button className="rounded-md bg-[#252525] px-4 py-2 text-sm text-[#7A7A7A] hover:bg-[#D32F2F]/10 hover:text-white transition-colors">
                3
              </button>
              <button
                className="rounded-md bg-[#252525] px-4 py-2 text-sm text-[#7A7A7A] hover:bg-[#D32F2F]/10 hover:text-white transition-colors"
                aria-label="Página siguiente"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="bg-[#1C1C1C] border-t border-[#7A7A7A]/20 py-8">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-[#7A7A7A]">
            &copy; {new Date().getFullYear()} Fox Motorepuestos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
