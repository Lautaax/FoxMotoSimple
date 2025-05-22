"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, MapPin } from "lucide-react"
import { LocalBusinessInfo } from "@/components/local-business-info"
import { generateLocalBusinessSchema } from "@/lib/schema"
import { areaData } from "./areaData"

// Tipos para los parámetros
type Props = {
  params: { slug: string }
}

export default function AreaPageClient({ params }: Props) {
  const { slug } = params
  const area = areaData[slug as keyof typeof areaData]

  // Si el área no existe, mostrar página de error
  if (!area) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1C1C1C] text-white p-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-6">Área no encontrada</h2>
          <p className="text-[#7A7A7A] mb-8">Lo sentimos, el área que estás buscando no existe o ha sido movida.</p>
          <Button asChild className="bg-[#D32F2F] hover:bg-[#D32F2F]/80">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Generar schema.org para esta página específica
  const localBusinessSchema = {
    ...generateLocalBusinessSchema(),
    name: `Fox Motorepuestos - Repuestos para Motos en ${area.name}`,
    description: area.description,
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
      {/* Agregar schema.org específico para esta página */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Header */}
      <header className="w-full border-b border-[#7A7A7A]/20 bg-[#1C1C1C]">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Volver al inicio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-[#D32F2F]" />
            <span className="text-sm text-[#7A7A7A]">{area.distance}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">Repuestos para Motos en {area.name}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[#252525] rounded-lg p-6 mb-8">
                <p className="text-lg mb-4">{area.content}</p>
                <p className="text-lg">
                  En Fox Motorepuestos encontrarás todo lo que necesitas para tu moto: cadenas, piñones, aceites,
                  neumáticos, frenos, baterías y mucho más. Trabajamos con las mejores marcas como Far, The Orange,
                  Osaca, DID, Choho, Metzeler, Motul y Wander.
                </p>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden mb-8">
                <Image
                  src="/carousel/store-front.png"
                  alt={`Fox Motorepuestos - Repuestos para motos en ${area.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-[#252525] rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  ¿Por qué elegirnos para tus repuestos de moto en {area.name}?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✓</span>
                    <span>Amplio catálogo de repuestos originales y alternativos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✓</span>
                    <span>Envíos rápidos y seguros a {area.name}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✓</span>
                    <span>Asesoramiento especializado por teléfono o WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✓</span>
                    <span>Precios competitivos y múltiples formas de pago</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D32F2F] font-bold">✓</span>
                    <span>Garantía en todos nuestros productos</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <LocalBusinessInfo showTitle={true} showMap={true} />

              <div className="mt-8 bg-[#1C1C1C] p-6 rounded-lg border border-[#7A7A7A]/20">
                <h3 className="text-xl font-bold mb-4">Contacto Rápido</h3>
                <p className="text-[#7A7A7A] mb-4">
                  ¿Necesitas un repuesto específico para tu moto en {area.name}? Contáctanos y te ayudaremos a
                  encontrarlo.
                </p>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80"
                    onClick={() => window.open("https://wa.me/542915347003", "_blank")}
                  >
                    Contactar por WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#7A7A7A]/20 hover:bg-[#303030]"
                    onClick={() => window.open("tel:+542915347003", "_blank")}
                  >
                    Llamar ahora
                  </Button>
                </div>
              </div>
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
