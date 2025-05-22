"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocalAreasProps {
  className?: string
}

export function LocalAreasSection({ className }: LocalAreasProps) {
  // Lista de áreas cercanas a Bahía Blanca para SEO local
  const localAreas = [
    {
      name: "Bahía Blanca",
      slug: "bahia-blanca",
      description: "Nuestra tienda principal de repuestos para motos en el centro de Bahía Blanca.",
    },
    {
      name: "Punta Alta",
      slug: "punta-alta",
      description: "Servimos a clientes de Punta Alta con envíos rápidos y atención personalizada.",
    },
    {
      name: "Ingeniero White",
      slug: "ingeniero-white",
      description: "Repuestos de calidad para motociclistas de Ingeniero White a minutos de nuestra tienda.",
    },
    {
      name: "General Daniel Cerri",
      slug: "general-daniel-cerri",
      description: "Atendemos a los motociclistas de General Daniel Cerri con amplio stock de repuestos.",
    },
    {
      name: "Villa Bordeu",
      slug: "villa-bordeu",
      description: "Servicio de repuestos para motos a todos los residentes de Villa Bordeu.",
    },
    {
      name: "Cabildo",
      slug: "cabildo",
      description: "Envíos de repuestos para motos a Cabildo con servicio de asesoramiento incluido.",
    },
  ]

  return (
    <div className={cn("py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-[#D32F2F]/10 px-3 py-1 text-sm text-[#D32F2F] mb-2">
            Áreas de Servicio
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Servimos a toda la región</h2>
          <p className="max-w-[700px] text-[#7A7A7A] md:text-lg">
            Ofrecemos nuestros productos y servicios en Bahía Blanca y localidades cercanas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localAreas.map((area) => (
            <Card
              key={area.slug}
              className="bg-[#1C1C1C] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="rounded-full bg-[#D32F2F]/10 p-2 mt-1">
                    <MapPin className="h-5 w-5 text-[#D32F2F]" />
                  </div>
                  <h3 className="text-xl font-bold">{area.name}</h3>
                </div>
                <p className="text-[#7A7A7A] mb-4">{area.description}</p>
                <Link href={`/areas/${area.slug}`} className="text-[#D32F2F] text-sm flex items-center hover:underline">
                  Ver más información
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
