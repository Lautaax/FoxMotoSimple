"use client"

import { MapPin, Phone, Clock, Mail, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface LocalBusinessInfoProps {
  className?: string
  showTitle?: boolean
  showMap?: boolean
}

export function LocalBusinessInfo({ className, showTitle = true, showMap = false }: LocalBusinessInfoProps) {
  return (
    <div className={cn("bg-[#1C1C1C] p-6 rounded-lg border border-[#7A7A7A]/20", className)}>
      {showTitle && <h3 className="text-xl font-bold mb-6">Fox Motorepuestos - Bahía Blanca</h3>}

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#D32F2F]/10 p-2 mt-1">
            <MapPin className="h-5 w-5 text-[#D32F2F]" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Dirección</h4>
            <p className="text-[#7A7A7A]">Manzana de las Luces 475</p>
            <p className="text-[#7A7A7A]">Bahía Blanca, Buenos Aires, Argentina</p>
            <a
              href="https://maps.google.com/?q=Manzana+de+las+Luces+475,+Bahía+Blanca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D32F2F] text-sm flex items-center gap-1 mt-1 hover:underline"
            >
              Cómo llegar
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#D32F2F]/10 p-2 mt-1">
            <Phone className="h-5 w-5 text-[#D32F2F]" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Teléfono</h4>
            <a href="tel:+542915347003" className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
              291 534-7003
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#D32F2F]/10 p-2 mt-1">
            <Mail className="h-5 w-5 text-[#D32F2F]" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Email</h4>
            <a
              href="mailto:info@foxmotorepuestos.com"
              className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors"
            >
              info@foxmotorepuestos.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-[#D32F2F]/10 p-2 mt-1">
            <Clock className="h-5 w-5 text-[#D32F2F]" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Horario de Atención</h4>
            <p className="text-[#7A7A7A]">Lunes a Viernes: 9:00 - 21:00</p>
            <p className="text-[#7A7A7A]">Sábados: 9:00 - 19:00</p>
            <p className="text-[#7A7A7A]">Domingos: 10:00 - 18:00</p>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="mt-6 h-[300px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5!2d-62.2!3d-38.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQyJzAwLjAiUyA2MsKwMTInMDAuMCJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Fox Motorepuestos en Bahía Blanca"
          ></iframe>
        </div>
      )}
    </div>
  )
}
