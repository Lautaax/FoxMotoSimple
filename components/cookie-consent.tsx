"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X, Settings } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consentData))
    setShowConsent(false)
  }

  const acceptSelected = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consentData))
    setShowConsent(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem("cookie-consent", JSON.stringify(consentData))
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 shadow-2xl">
        <CardContent className="p-6">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="h-6 w-6 text-[#D32F2F] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white mb-2">Uso de Cookies</h3>
                  <p className="text-[#7A7A7A] text-sm leading-relaxed">
                    Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio y
                    personalizar el contenido. Al hacer clic en "Aceptar todo", consientes el uso de todas las cookies.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  size="sm"
                  className="border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  size="sm"
                  className="border-[#7A7A7A] text-white hover:bg-[#7A7A7A]/10 bg-transparent"
                >
                  Rechazar
                </Button>
                <Button onClick={acceptAll} size="sm" className="bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white">
                  Aceptar todo
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Configuración de Cookies</h3>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="ghost"
                  size="icon"
                  className="text-[#7A7A7A] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Cookies Necesarias</div>
                    <div className="text-sm text-[#7A7A7A]">Esenciales para el funcionamiento del sitio</div>
                  </div>
                  <div className="text-sm text-[#7A7A7A]">Siempre activas</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Cookies de Análisis</div>
                    <div className="text-sm text-[#7A7A7A]">Nos ayudan a entender cómo usas el sitio</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#7A7A7A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Cookies de Marketing</div>
                    <div className="text-sm text-[#7A7A7A]">Para mostrarte contenido relevante</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#7A7A7A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D32F2F]"></div>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={acceptSelected} className="flex-1 bg-[#D32F2F] hover:bg-[#D32F2F]/80 text-white">
                  Guardar preferencias
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
