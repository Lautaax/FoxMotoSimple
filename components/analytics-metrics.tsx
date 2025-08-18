"use client"

import { Users, Clock, MousePointerClick, BarChart2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { AnalyticsUserMetrics } from "@/lib/analytics-service"
import { cn } from "@/lib/utils"

interface AnalyticsMetricsProps {
  data: AnalyticsUserMetrics
  className?: string
}

export function AnalyticsMetrics({ data, className }: AnalyticsMetricsProps) {
  // Formatear duración en formato mm:ss
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Formatear números con separadores de miles
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Usuarios totales</p>
              <h3 className="text-2xl font-bold">{formatNumber(data.totalUsers)}</h3>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-[#7A7A7A]">Nuevos: </span>
                <span className="text-xs font-medium text-green-500">{formatNumber(data.newUsers)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-purple-500/10 p-3">
              <BarChart2 className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Sesiones por usuario</p>
              <h3 className="text-2xl font-bold">{data.sessionsPerUser.toFixed(2)}</h3>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-[#7A7A7A]">Recurrentes: </span>
                <span className="text-xs font-medium text-blue-500">{formatNumber(data.returningUsers)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Tiempo promedio</p>
              <h3 className="text-2xl font-bold">{formatDuration(data.avgSessionDuration)}</h3>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-[#7A7A7A]">Por sesión</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-amber-500/10 p-3">
              <MousePointerClick className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-[#7A7A7A]">Tasa de conversión</p>
              <h3 className="text-2xl font-bold">2.8%</h3>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs text-green-500">↑ 0.5%</span>
                <span className="text-xs text-[#7A7A7A]">vs. mes anterior</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
