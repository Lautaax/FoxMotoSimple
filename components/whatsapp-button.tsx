"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent("¡Hola! Me interesa consultar sobre repuestos para motos. ¿Podrían ayudarme?")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Tooltip */}
        <div
          className={`absolute bottom-16 right-0 bg-white text-black px-3 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="text-sm font-medium">¿Necesitas ayuda?</div>
          <div className="text-xs text-gray-600">Chatea con nosotros</div>
          {/* Arrow */}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        {/* WhatsApp Button */}
        <Button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          size="icon"
        >
          <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
          <span className="sr-only">Contactar por WhatsApp</span>
        </Button>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      </div>
    </div>
  )
}
