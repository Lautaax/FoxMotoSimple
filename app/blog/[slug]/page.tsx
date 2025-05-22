import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, Tag, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import { StructuredBreadcrumbs } from "@/components/structured-breadcrumbs"
import { BlogPostCard } from "@/components/blog-post-card"
import { getCanonicalUrl } from "@/lib/url-utils"
import { generateArticleSchema } from "@/lib/schema"

// Datos simulados para el blog
const blogPosts = [
  {
    title: "Guía completa para elegir la cadena perfecta para tu moto",
    slug: "guia-elegir-cadena-perfecta-moto",
    excerpt:
      "Descubre cómo seleccionar la cadena ideal según el tipo de moto, uso y presupuesto. Comparamos las principales marcas y modelos disponibles en el mercado.",
    content: `
      <p>La cadena es uno de los componentes más importantes de tu moto, ya que transmite la potencia desde el motor hasta la rueda trasera. Elegir la cadena correcta no solo mejora el rendimiento de tu moto, sino que también garantiza tu seguridad y puede ahorrarte dinero a largo plazo.</p>
      
      <h2>Tipos de cadenas para motos</h2>
      
      <p>Existen varios tipos de cadenas para motos, cada una con sus propias características y ventajas:</p>
      
      <h3>Cadenas estándar (no selladas)</h3>
      
      <p>Son las más básicas y económicas. No tienen ningún tipo de sellado, lo que significa que requieren un mantenimiento frecuente (lubricación cada 300-500 km). Son adecuadas para motos de baja cilindrada y uso urbano ocasional.</p>
      
      <h3>Cadenas selladas</h3>
      
      <p>Estas cadenas tienen sellos entre las placas laterales que mantienen la grasa dentro y la suciedad fuera. Hay varios tipos:</p>
      
      <ul>
        <li><strong>Cadenas O-ring:</strong> Utilizan juntas tóricas para sellar la grasa. Ofrecen buena durabilidad y requieren menos mantenimiento que las cadenas estándar.</li>
        <li><strong>Cadenas X-ring:</strong> Utilizan juntas en forma de X que ofrecen menos fricción y mayor durabilidad que las O-ring.</li>
        <li><strong>Cadenas Z-ring:</strong> La última evolución, con juntas en forma de Z que reducen aún más la fricción y aumentan la vida útil.</li>
      </ul>
      
      <h2>¿Cómo elegir la cadena adecuada?</h2>
      
      <p>Para seleccionar la cadena perfecta para tu moto, debes considerar varios factores:</p>
      
      <h3>Compatibilidad con tu moto</h3>
      
      <p>Lo primero es asegurarte de que la cadena sea compatible con tu moto. Debes verificar:</p>
      
      <ul>
        <li><strong>Paso de la cadena:</strong> Es la distancia entre los centros de los pines. Las más comunes son 428, 520, 525 y 530.</li>
        <li><strong>Longitud:</strong> Número de eslabones que necesita tu moto.</li>
      </ul>
      
      <h3>Tipo de uso</h3>
      
      <p>El uso que le das a tu moto determinará el tipo de cadena más adecuado:</p>
      
      <ul>
        <li><strong>Uso urbano ocasional:</strong> Una cadena estándar o O-ring básica puede ser suficiente.</li>
        <li><strong>Uso diario/commuting:</strong> Una cadena O-ring o X-ring de calidad media es recomendable.</li>
        <li><strong>Viajes largos/touring:</strong> Una cadena X-ring o Z-ring de alta calidad es la mejor opción.</li>
        <li><strong>Off-road/enduro:</strong> Cadenas reforzadas específicas para este uso.</li>
      </ul>
      
      <h2>Marcas recomendadas</h2>
      
      <p>En Fox Motorepuestos trabajamos con las mejores marcas del mercado:</p>
      
      <h3>DID</h3>
      
      <p>Marca japonesa reconocida mundialmente por su calidad. Sus cadenas X-ring y Z-ring son de las más duraderas del mercado. Recomendadas para motos de media y alta cilindrada.</p>
      
      <h3>Choho</h3>
      
      <p>Excelente relación calidad-precio. Sus cadenas O-ring ofrecen buena durabilidad a un precio más accesible. Ideal para motos de baja y media cilindrada.</p>
      
      <h3>RK</h3>
      
      <p>Otra marca japonesa de alta calidad. Sus cadenas son utilizadas incluso en competiciones de MotoGP.</p>
      
      <h2>Mantenimiento de la cadena</h2>
      
      <p>Independientemente del tipo de cadena que elijas, un buen mantenimiento es esencial para prolongar su vida útil:</p>
      
      <ul>
        <li>Limpia la cadena regularmente con un limpiador específico.</li>
        <li>Lubrica la cadena después de cada limpieza y cada 500-1000 km (dependiendo del tipo).</li>
        <li>Verifica y ajusta la tensión según las especificaciones del fabricante.</li>
        <li>Inspecciona regularmente para detectar desgaste o daños.</li>
      </ul>
      
      <h2>Conclusión</h2>
      
      <p>Elegir la cadena adecuada para tu moto es una decisión importante que afectará tanto al rendimiento como a la seguridad. En Fox Motorepuestos contamos con un amplio catálogo de cadenas de las mejores marcas y nuestro equipo está disponible para asesorarte en tu elección.</p>
      
      <p>Recuerda que invertir en una cadena de calidad puede ahorrarte dinero a largo plazo, ya que tendrá mayor durabilidad y requerirá menos mantenimiento.</p>
      
      <p>¿Tienes dudas sobre qué cadena es la mejor para tu moto? Visítanos en nuestra tienda en Manzana de las Luces 475, Bahía Blanca, o contáctanos por WhatsApp al 291 534-7003.</p>
    `,
    coverImage: "/blog/cadenas-moto.jpg",
    date: "15 de mayo, 2023",
    readTime: "8 min de lectura",
    category: "Guías de compra",
    author: "Equipo Fox Motorepuestos",
    tags: ["cadenas", "mantenimiento", "repuestos", "DID", "Choho"],
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
]

// Función para generar metadatos dinámicos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Artículo no encontrado | Fox Motorepuestos",
      description: "El artículo que estás buscando no existe o ha sido movido.",
    }
  }

  return {
    title: `${post.title} | Blog Fox Motorepuestos`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Fox Motorepuestos"],
      tags: post.tags || [],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Artículos relacionados (simulados)
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  // Generar schema.org para el artículo
  const baseUrl = getCanonicalUrl()
  const articleSchema = generateArticleSchema({
    headline: post.title,
    description: post.excerpt,
    image: `${baseUrl}${post.coverImage}`,
    datePublished: post.date,
    authorName: post.author || "Equipo Fox Motorepuestos",
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
      {/* Schema.org para el artículo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* Header */}
      <header className="w-full border-b border-[#7A7A7A]/20 bg-[#1C1C1C]">
        <div className="container flex h-16 items-center">
          <Link href="/blog" className="flex items-center gap-2">
            <span className="text-sm">Volver al blog</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          {/* Breadcrumbs */}
          <StructuredBreadcrumbs
            className="mb-8"
            items={[{ label: "Blog", href: "/blog" }]}
            currentPageLabel={post.title}
          />

          {/* Cabecera del artículo */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-block rounded-full bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F]">
              {post.category}
            </div>
            <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-[#7A7A7A]">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              {post.author && <span>Por {post.author}</span>}
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>

          {/* Contenido del artículo */}
          <div className="mx-auto max-w-[800px]">
            <div
              className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-[#D32F2F] prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
            />

            {/* Etiquetas */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-[#7A7A7A]" />
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full bg-[#252525] px-3 py-1 text-xs text-[#7A7A7A] hover:bg-[#D32F2F]/10 hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Compartir */}
            <div className="mt-8 border-t border-[#7A7A7A]/20 pt-8">
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <span className="text-sm font-medium">Compartir este artículo:</span>
                <div className="flex gap-2">
                  <button
                    className="rounded-full bg-[#252525] p-2 text-[#7A7A7A] hover:bg-[#1877F2] hover:text-white transition-colors"
                    aria-label="Compartir en Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-full bg-[#252525] p-2 text-[#7A7A7A] hover:bg-[#1DA1F2] hover:text-white transition-colors"
                    aria-label="Compartir en Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-full bg-[#252525] p-2 text-[#7A7A7A] hover:bg-[#0A66C2] hover:text-white transition-colors"
                    aria-label="Compartir en LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-full bg-[#252525] p-2 text-[#7A7A7A] hover:bg-[#D32F2F] hover:text-white transition-colors"
                    aria-label="Compartir por email"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Artículos relacionados */}
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold">Artículos relacionados</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post, index) => (
                <BlogPostCard
                  key={index}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                />
              ))}
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
