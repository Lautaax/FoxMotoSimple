import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function LocalSeoFooter() {
  return (
    <div className="bg-[#2A2A2A]/30 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          {/* Ubicación */}
          <div>
            <h5 className="font-semibold mb-3 text-[#D32F2F]">Ubicación</h5>
            <div className="space-y-2 text-[#7A7A7A]">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Manzana de las Luces 475</p>
                  <p>Bahía Blanca, Buenos Aires</p>
                  <p>Argentina (8000)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <h5 className="font-semibold mb-3 text-[#D32F2F]">Horarios de Atención</h5>
            <div className="space-y-1 text-[#7A7A7A]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Lunes a Viernes: 9:00 - 20:00</span>
              </div>
              <p className="ml-6">Sábados: 9:00 - 19:00</p>
              <p className="ml-6">Domingos: Cerrado</p>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="font-semibold mb-3 text-[#D32F2F]">Contacto</h5>
            <div className="space-y-2 text-[#7A7A7A]">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+542915221351" className="hover:text-[#D32F2F] transition-colors">
                  +54 291 522-1351
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:foxmotorepuestos@gmail.com" className="hover:text-[#D32F2F] transition-colors">
                  foxmotorepuestos@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Áreas de Servicio */}
          <div>
            <h5 className="font-semibold mb-3 text-[#D32F2F]">Áreas de Servicio</h5>
            <div className="space-y-1 text-[#7A7A7A] text-xs">
              <p>• Bahía Blanca Centro</p>
              <p>• Punta Alta</p>
              <p>• Ingeniero White</p>
              <p>• Villa Mitre</p>
              <p>• Cerri</p>
              <p>• General Daniel Cerri</p>
              <p>• Monte Hermoso</p>
              <p>• Coronel Rosales</p>
            </div>
          </div>
        </div>

        {/* SEO Keywords Footer */}
        <div className="mt-8 pt-6 border-t border-[#7A7A7A]/20">
          <div className="text-xs text-[#7A7A7A] leading-relaxed">
            <p className="mb-2">
              <strong className="text-white">Fox Motorepuestos</strong> - Especialistas en repuestos para motos en Bahía
              Blanca. Distribuimos cadenas DID, FAR, Orange, neumáticos Metzeler, Pirelli, aceites Motul, Castrol y
              accesorios para todas las marcas de motocicletas.
            </p>
            <p>
              Servicio técnico especializado, ventas mayoristas y minoristas. Atendemos Bahía Blanca, Punta Alta,
              Ingeniero White, Monte Hermoso y toda la zona. Repuestos originales con garantía.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
