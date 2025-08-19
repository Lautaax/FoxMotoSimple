"use client"

import { MapPin, Phone, Clock, Mail, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateWhatsAppUrl } from "@/lib/utils"

interface BusinessHours {
  day: string
  hours: string
  isOpen?: boolean
}

interface LocalBusinessInfoProps {
  name?: string
  address?: string
  phone?: string
  email?: string
  hours?: BusinessHours[]
  rating?: number
  reviewCount?: number
  className?: string
}

const defaultHours: BusinessHours[] = [
  { day: "Lunes", hours: "8:00 - 18:00", isOpen: true },
  { day: "Martes", hours: "8:00 - 18:00", isOpen: true },
  { day: "Miércoles", hours: "8:00 - 18:00", isOpen: true },
  { day: "Jueves", hours: "8:00 - 18:00", isOpen: true },
  { day: "Viernes", hours: "8:00 - 18:00", isOpen: true },
  { day: "Sábado", hours: "8:00 - 13:00", isOpen: true },
  { day: "Domingo", hours: "Cerrado", isOpen: false },
]

export function LocalBusinessInfo({
  name = "Fox MotoRespuestos",
  address = "Av. Principal 123, Buenos Aires, Argentina",
  phone = "+54 11 1234-5678",
  email = "info@foxmotorespuestos.com",
  hours = defaultHours,
  rating = 4.8,
  reviewCount = 127,
  className = "",
}: LocalBusinessInfoProps) {
  const handleCallClick = () => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  }

  const handleWhatsAppClick = () => {
    const message = "Hola Fox MotoRespuestos, necesito información sobre sus productos y servicios."
    const whatsappUrl = generateWhatsAppUrl(phone, message)
    window.open(whatsappUrl, "_blank")
  }

  const handleEmailClick = () => {
    window.open(`mailto:${email}`, "_self")
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardContent className="p-6 space-y-6">
        {/* Business Name & Rating */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-300">
              {rating} ({reviewCount} reseñas)
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#D32F2F] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-300">{address}</p>
              <Button
                variant="link"
                size="sm"
                onClick={handleDirectionsClick}
                className="text-[#D32F2F] hover:text-[#B71C1C] p-0 h-auto font-normal"
              >
                Ver en Google Maps
              </Button>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#D32F2F] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-300">{phone}</p>
              <div className="flex gap-2 mt-1">
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleCallClick}
                  className="text-[#D32F2F] hover:text-[#B71C1C] p-0 h-auto font-normal"
                >
                  Llamar
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleWhatsAppClick}
                  className="text-green-500 hover:text-green-400 p-0 h-auto font-normal"
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Email */}
          {email && (
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#D32F2F] flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-300">{email}</p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={handleEmailClick}
                  className="text-[#D32F2F] hover:text-[#B71C1C] p-0 h-auto font-normal"
                >
                  Enviar email
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Business Hours */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#D32F2F]" />
            <h4 className="font-semibold text-white">Horarios de Atención</h4>
          </div>
          <div className="space-y-1">
            {hours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-300">{schedule.day}</span>
                <span className={schedule.isOpen ? "text-green-400" : "text-red-400"}>{schedule.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="text-center p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 font-medium">Abierto ahora</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Cierra a las 18:00</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default LocalBusinessInfo
