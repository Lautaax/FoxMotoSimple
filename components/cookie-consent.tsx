"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Cookie, Settings } from "lucide-react"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now(),
      }),
    )
    setIsVisible(false)
  }

  const acceptSelected = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        ...preferences,
        timestamp: Date.now(),
      }),
    )
    setIsVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now(),
      }),
    )
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 shadow-2xl max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-[#D32F2F]/10 p-2 flex-shrink-0">
              <Cookie className="h-5 w-5 text-[#D32F2F]" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-white">Uso de Cookies</h3>
              <p className="text-[#7A7A7A] text-sm mb-4 leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y
                personalizar el contenido. Puedes aceptar todas las cookies o personalizar tus preferencias.
              </p>

              {showSettings && (
                <div className="mb-4 space-y-3 p-4 bg-[#2A2A2A]/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-white">Cookies necesarias</div>
                      <div className="text-xs text-[#7A7A7A]">Requeridas para el funcionamiento básico</div>
                    </div>
                    <div className="text-[#D32F2F] text-sm font-medium">Siempre activas</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-white">Cookies de análisis</div>
                      <div className="text-xs text-[#7A7A7A]">Nos ayudan a entender cómo usas el sitio</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#7A7A7A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-white">Cookies de marketing</div>
                      <div className="text-xs text-[#7A7A7A]">Para mostrarte contenido relevante</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#7A7A7A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button onClick={acceptAll} className="bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white" size="sm">
                  Aceptar todas
                </Button>

                {showSettings ? (
                  <Button
                    onClick={acceptSelected}
                    variant="outline"
                    className="border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
                    size="sm"
                  >
                    Guardar preferencias
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10"
                    size="sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Personalizar
                  </Button>
                )}

                <Button
                  onClick={rejectAll}
                  variant="ghost"
                  className="text-[#7A7A7A] hover:text-white hover:bg-[#7A7A7A]/10"
                  size="sm"
                >
                  Rechazar todas
                </Button>
              </div>
            </div>

            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="icon"
              className="text-[#7A7A7A] hover:text-white flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
