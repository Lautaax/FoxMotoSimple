"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Navigation, Star, ExternalLink, Copy, Check } from "lucide-react"
import { formatPhoneNumber, generateWhatsAppURL, getBusinessStatus } from "@/lib/utils"

interface LocalBusinessInfoProps {
  showTitle?: boolean
  compact?: boolean
  className?: string
}

export function LocalBusinessInfo({ showTitle = true, compact = false, className = "" }: LocalBusinessInfoProps) {
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const businessInfo = {
    name: "Fox Motorepuestos",
    address: "Manzana de las Luces 475, Bahía Blanca, Buenos Aires",
    phone: "542915221351",
    email: "foxmotorepuestos@gmail.com",
    coordinates: {
      lat: -38.6976364,
      lng: -62.3089406,
    },
    rating: 4.9,
    reviewCount: 127,
  }

  const { isOpen, message } = getBusinessStatus()

  const handlePhoneCall = () => {
    window.open(`tel:+${businessInfo.phone}`, "_self")
  }

  const handleWhatsApp = () => {
    const whatsappURL = generateWhatsAppURL(
      businessInfo.phone,
      "¡Hola! Me interesa consultar sobre repuestos para motos. ¿Podrían ayudarme?",
    )
    window.open(whatsappURL, "_blank")
  }

  const handleEmail = () => {
    window.open(`mailto:${businessInfo.email}`, "_self")
  }

  const handleDirections = () => {
    const { lat, lng } = businessInfo.coordinates
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=ChIJ...`
    window.open(googleMapsURL, "_blank")
  }

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(formatPhoneNumber(businessInfo.phone))
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch (err) {
      console.error("Error copying phone number:", err)
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(businessInfo.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch (err) {
      console.error("Error copying email:", err)
    }
  }

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-[#D32F2F]" />
          <span className="text-[#7A7A7A]">{businessInfo.address}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-[#D32F2F]" />
          <button onClick={handlePhoneCall} className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
            {formatPhoneNumber(businessInfo.phone)}
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-[#D32F2F]" />
          <span className={`${isOpen ? "text-green-400" : "text-orange-400"}`}>{message}</span>
        </div>
      </div>
    )
  }

  return (
    <Card className={`bg-[#1C1C1C] border-[#7A7A7A]/20 ${className}`}>
      {showTitle && (
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#D32F2F]" />
            Información del Negocio
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className="space-y-6">
        {/* Business Rating */}
        <div className="flex items-center gap-3 p-3 bg-[#2A2A2A] rounded-lg">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(businessInfo.rating) ? "fill-yellow-400 text-yellow-400" : "text-[#7A7A7A]"}`}
              />
            ))}
          </div>
          <span className="text-white font-medium">{businessInfo.rating}</span>
          <span className="text-[#7A7A7A] text-sm">({businessInfo.reviewCount} reseñas)</span>
        </div>

        {/* Address */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-[#D32F2F] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Dirección</p>
              <p className="text-[#7A7A7A] text-sm">{businessInfo.address}</p>
            </div>
          </div>

          <Button
            onClick={handleDirections}
            variant="outline"
            size="sm"
            className="w-full border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Cómo llegar
          </Button>
        </div>

        {/* Phone */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#D32F2F]" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Teléfono</p>
              <p className="text-[#7A7A7A] text-sm">{formatPhoneNumber(businessInfo.phone)}</p>
            </div>
            <button onClick={handleCopyPhone} className="p-2 hover:bg-[#7A7A7A]/10 rounded-md transition-colors">
              {copiedPhone ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-[#7A7A7A]" />}
            </button>
          </div>

          <div className="flex gap-2">
            <Button onClick={handlePhoneCall} size="sm" className="flex-1 bg-[#D32F2F] hover:bg-[#D32F2F]/80">
              <Phone className="mr-2 h-4 w-4" />
              Llamar
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="sm"
              variant="outline"
              className="flex-1 border-green-600 text-green-400 hover:bg-green-600/10 bg-transparent"
            >
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#D32F2F]" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Email</p>
              <p className="text-[#7A7A7A] text-sm">{businessInfo.email}</p>
            </div>
            <button onClick={handleCopyEmail} className="p-2 hover:bg-[#7A7A7A]/10 rounded-md transition-colors">
              {copiedEmail ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-[#7A7A7A]" />}
            </button>
          </div>

          <Button
            onClick={handleEmail}
            variant="outline"
            size="sm"
            className="w-full border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
          >
            <Mail className="mr-2 h-4 w-4" />
            Enviar email
          </Button>
        </div>

        {/* Business Hours */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[#D32F2F]" />
            <div className="flex-1">
              <p className="text-white font-medium mb-1">Horarios</p>
              <p className={`text-sm font-medium ${isOpen ? "text-green-400" : "text-orange-400"}`}>{message}</p>
            </div>
          </div>

          <div className="bg-[#2A2A2A] rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Lunes - Viernes</span>
              <span className="text-white">9:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Sábados</span>
              <span className="text-white">9:00 - 19:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7A7A7A]">Domingos</span>
              <span className="text-red-400">Cerrado</span>
            </div>
          </div>
        </div>

        {/* Google My Business Link */}
        <Button
          onClick={() => window.open("https://g.page/foxmotorepuestosbb", "_blank")}
          variant="outline"
          size="sm"
          className="w-full border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Ver en Google Maps
        </Button>
      </CardContent>
    </Card>
  )
}
