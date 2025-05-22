"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Comprobar si el usuario ya ha aceptado las cookies
    const hasConsent = localStorage.getItem("cookie-consent")
    if (!hasConsent) {
      // Mostrar el banner después de un pequeño retraso
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true")
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "false")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1C1C1C] p-4 shadow-lg border-t border-[#7A7A7A]/20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">Usamos cookies</h3>
          <p className="text-sm text-[#7A7A7A]">
            Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al continuar navegando, aceptas nuestra{" "}
            <a href="#" className="text-[#D32F2F] hover:underline">
              política de cookies
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={declineCookies} className="border-[#7A7A7A]/20 hover:bg-[#303030]">
            Rechazar
          </Button>
          <Button onClick={acceptCookies} className="bg-[#D32F2F] hover:bg-[#B71C1C]">
            Aceptar
          </Button>
          <button
            onClick={declineCookies}
            className="text-[#7A7A7A] hover:text-white p-1 rounded-full"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
