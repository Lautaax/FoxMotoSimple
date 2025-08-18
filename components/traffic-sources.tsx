"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalyticsTrafficSource } from "@/lib/analytics-service"
import { cn } from "@/lib/utils"

interface TrafficSourcesProps {
  data: AnalyticsTrafficSource[]
  className?: string
}

export function TrafficSources({ data, className }: TrafficSourcesProps) {
  // Obtener el color según el medio
  const getSourceColor = (medium: string) => {
    switch (medium) {
      case "organic":
        return "bg-green-500"
      case "social":
        return "bg-blue-500"
      case "referral":
        return "bg-purple-500"
      case "email":
        return "bg-amber-500"
      case "cpc":
      case "ppc":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Obtener el nombre formateado del medio
  const getMediumName = (medium: string) => {
    switch (medium) {
      case "organic":
        return "Orgánico"
      case "social":
        return "Social"
      case "referral":
        return "Referencia"
      case "email":
        return "Email"
      case "cpc":
      case "ppc":
        return "Pago"
      case "none":
        return "Directo"
      default:
        return medium.charAt(0).toUpperCase() + medium.slice(1)
    }
  }

  // Formatear el nombre de la fuente
  const formatSourceName = (source: string) => {
    if (source === "google") return "Google"
    if (source === "direct") return "Directo"
    if (source === "facebook.com") return "Facebook"
    if (source === "instagram.com") return "Instagram"
    if (source === "twitter.com") return "Twitter"
    if (source === "linkedin.com") return "LinkedIn"
    if (source === "bing") return "Bing"
    if (source === "yahoo") return "Yahoo"
    if (source === "duckduckgo.com") return "DuckDuckGo"

    // Si es un dominio, quitar el .com, .org, etc.
    if (source.includes(".")) {
      const parts = source.split(".")
      if (parts.length >= 2) {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
      }
    }

    return source.charAt(0).toUpperCase() + source.slice(1)
  }

  return (
    <Card className={cn("bg-[#1C1C1C] border-[#7A7A7A]/20", className)}>
      <CardHeader>
        <CardTitle>Fuentes de tráfico</CardTitle>
        <CardDescription>Principales fuentes de tráfico en los últimos 30 días</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("h-3 w-3 rounded-full", getSourceColor(source.medium))} />
                <div>
                  <p className="font-medium">{formatSourceName(source.source)}</p>
                  <p className="text-xs text-[#7A7A7A]">{getMediumName(source.medium)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{source.sessions.toLocaleString()}</p>
                <p className="text-xs text-[#7A7A7A]">{source.percentOfTotal.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
