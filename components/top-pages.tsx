"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalyticsPageView } from "@/lib/analytics-service"
import { cn } from "@/lib/utils"

interface TopPagesProps {
  data: AnalyticsPageView[]
  className?: string
}

export function TopPages({ data, className }: TopPagesProps) {
  // Formatear duración en formato mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Formatear el título de la página
  const formatPageTitle = (title: string) => {
    // Quitar el sufijo del título si existe
    if (title.includes(" - Fox Motorepuestos")) {
      return title.replace(" - Fox Motorepuestos", "")
    }
    return title
  }

  // Formatear la ruta de la página
  const formatPagePath = (path: string) => {
    if (path === "/") return "Página de inicio"

    // Convertir rutas como /productos/cadenas-transmision a formato legible
    const parts = path.split("/").filter(Boolean)
    if (parts.length > 0) {
      const formattedParts = parts.map((part) =>
        part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      )
      return formattedParts.join(" > ")
    }

    return path
  }

  return (
    <Card className={cn("bg-[#1C1C1C] border-[#7A7A7A]/20", className)}>
      <CardHeader>
        <CardTitle>Páginas más visitadas</CardTitle>
        <CardDescription>Las páginas con más visitas en los últimos 30 días</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((page, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{formatPageTitle(page.pageTitle)}</h4>
                <span className="text-sm font-medium text-[#D32F2F]">{page.pageViews.toLocaleString()} vistas</span>
              </div>
              <div className="flex items-center text-xs text-[#7A7A7A]">
                <span className="flex-1">{formatPagePath(page.pagePath)}</span>
                <div className="flex items-center gap-3">
                  <span>{formatDuration(page.avgTimeOnPage)} tiempo</span>
                  <span>{page.bounceRate.toFixed(1)}% rebote</span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#252525]">
                <div
                  className="h-full bg-[#D32F2F]"
                  style={{ width: `${(page.pageViews / data[0].pageViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
