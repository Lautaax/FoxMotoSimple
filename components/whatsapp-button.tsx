"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
  position?: "bottom-right" | "bottom-left"
  className?: string
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hola, me gustaría consultar sobre repuestos para mi moto.",
  position = "bottom-right",
  className,
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  // Formatear el número de teléfono (eliminar espacios, guiones, etc.)
  const formattedPhone = phoneNumber.replace(/\D/g, "")

  // Crear el enlace de WhatsApp con el mensaje predeterminado
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

  // Mostrar el botón después de un pequeño retraso para mejorar la experiencia de usuario
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    // Iniciar la animación de pulso después de mostrar el botón
    const pulseTimer = setTimeout(() => {
      setIsPulsing(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(pulseTimer)
    }
  }, [])

  // Posición del botón
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed z-50 flex items-center justify-center rounded-full bg-[#25D366] p-3 shadow-lg transition-all duration-300 hover:bg-[#20BA5C] hover:scale-110",
        positionClasses[position],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        isPulsing && "animate-pulse-slow",
        className,
      )}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-8 w-8 text-white" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </a>
  )
}
