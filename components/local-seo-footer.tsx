"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface LocalSEOFooterProps {
  className?: string
}

export function LocalSEOFooter({ className }: LocalSEOFooterProps) {
  // Lista de áreas cercanas a Bahía Blanca para SEO local
  const localAreas = [
    { name: "Bahía Blanca", slug: "bahia-blanca" },
    { name: "Punta Alta", slug: "punta-alta" },
    { name: "Ingeniero White", slug: "ingeniero-white" },
    { name: "General Daniel Cerri", slug: "general-daniel-cerri" },
    { name: "Villa Bordeu", slug: "villa-bordeu" },
    { name: "Cabildo", slug: "cabildo" },
    { name: "Villa Espora", slug: "villa-espora" },
    { name: "Villa Harding Green", slug: "villa-harding-green" },
  ]

  return (
    <div className={cn("py-6 border-t border-[#7A7A7A]/20", className)}>
      <div className="container px-4 md:px-6">
        <h4 className="text-sm font-medium mb-4">Áreas de servicio</h4>
        <div className="flex flex-wrap gap-2">
          {localAreas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className="text-xs text-[#7A7A7A] hover:text-[#D32F2F] transition-colors"
            >
              Repuestos de motos en {area.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
