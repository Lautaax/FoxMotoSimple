"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true)
      }, 1000)

      const hideTooltipTimer = setTimeout(() => {
        setShowTooltip(false)
      }, 8000)

      return () => {
        clearTimeout(tooltipTimer)
        clearTimeout(hideTooltipTimer)
      }
    }
  }, [isVisible])

  const handleWhatsAppClick = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent("¡Hola! Me interesa consultar sobre repuestos para motos. ¿Podrían ayudarme?")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 w-64 p-3 bg-white text-gray-800 rounded-lg shadow-lg border animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">¡Hola! 👋</p>
              <p className="text-xs text-gray-600 mt-1">¿Necesitas repuestos para tu moto? Escríbenos por WhatsApp</p>
            </div>
            <button onClick={() => setShowTooltip(false)} className="text-gray-400 hover:text-gray-600 ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#25D366]/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-in zoom-in-50 duration-500"
        size="icon"
      >
        <MessageCircle className="h-7 w-7 text-white" />
        <span className="sr-only">Contactar por WhatsApp</span>
      </Button>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
    </div>
  )
}
