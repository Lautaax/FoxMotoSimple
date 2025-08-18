"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { initGoogleAnalytics, trackPageView } from "@/lib/analytics-service"

interface AnalyticsProviderProps {
  measurementId: string
  children: React.ReactNode
}

export function AnalyticsProvider({ measurementId, children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Inicializar Google Analytics
    initGoogleAnalytics(measurementId)
  }, [measurementId])

  useEffect(() => {
    // Enviar evento de página vista cuando cambia la ruta
    if (pathname) {
      const url = searchParams?.toString() ? `${pathname}?${searchParams}` : pathname
      trackPageView(url, document.title)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
