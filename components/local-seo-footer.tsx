"use client"

import { MapPin, Phone, Clock, Star } from "lucide-react"

const localAreas = [
  "Bahía Blanca",
  "Punta Alta",
  "Ingeniero White",
  "General Cerri",
  "Cabildo",
  "Villa Rosas",
  "Grünbein",
  "Spurr",
]

const services = [
  "Repuestos para motos",
  "Cadenas de transmisión",
  "Neumáticos para motos",
  "Aceites y lubricantes",
  "Accesorios para motos",
  "Servicio técnico",
  "Ventas mayoristas",
  "Instalación de repuestos",
]

export function LocalSEOFooter() {
  return (
    <div className="bg-[#2A2A2A]/50 border-t border-[#7A7A7A]/20">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Local Areas */}
          <div>
            <h4 className="font-semibold mb-4 text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#D32F2F]" />
              Zonas de Cobertura
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {localAreas.map((area) => (
                <span key={area} className="text-[#7A7A7A] text-sm hover:text-[#D32F2F] transition-colors">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Nuestros Servicios</h4>
            <div className="space-y-1">
              {services.map((service) => (
                <div key={service} className="text-[#7A7A7A] text-sm hover:text-[#D32F2F] transition-colors">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Información del Negocio</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-[#7A7A7A] text-sm">
                <MapPin className="h-4 w-4 text-[#D32F2F] mt-0.5 flex-shrink-0" />
                <span>Manzana de las Luces 475, Bahía Blanca, Buenos Aires</span>
              </div>
              <div className="flex items-center gap-2 text-[#7A7A7A] text-sm">
                <Phone className="h-4 w-4 text-[#D32F2F]" />
                <span>291 522-1351</span>
              </div>
              <div className="flex items-start gap-2 text-[#7A7A7A] text-sm">
                <Clock className="h-4 w-4 text-[#D32F2F] mt-0.5 flex-shrink-0" />
                <div>
                  <div>Lun-Vie: 9:00-20:00</div>
                  <div>Sáb: 9:00-19:00</div>
                  <div>Dom: Cerrado</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#7A7A7A] text-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>4.9/5 estrellas (127 reseñas)</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="mt-8 pt-6 border-t border-[#7A7A7A]/20">
          <p className="text-xs text-[#7A7A7A] leading-relaxed">
            <strong className="text-white">Fox Motorepuestos</strong> - Especialistas en repuestos para motos en Bahía
            Blanca. Ventas mayoristas y minoristas de cadenas, neumáticos, aceites y accesorios para motocicletas.
            Servicio técnico especializado. Trabajamos con las mejores marcas: FAR, DID, Metzeler, Motul, Orange, Osaca,
            Choho y Wander. Atendemos Bahía Blanca, Punta Alta, Ingeniero White y zona. Repuestos originales con
            garantía. Instalación gratuita. Precios mayoristas para talleres y distribuidores.
          </p>
        </div>
      </div>
    </div>
  )
}
