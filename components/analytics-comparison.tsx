"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAnalytics } from "@/hooks/use-analytics"
import { useVisitorStats } from "@/hooks/use-visitor-stats"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface AnalyticsComparisonProps {
  className?: string
}

export function AnalyticsComparison({ className }: AnalyticsComparisonProps) {
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useAnalytics()
  const { totalVisits, todayVisits, onlineUsers, isLoading: isLoadingVisitorStats } = useVisitorStats()

  // Calcular la diferencia porcentual entre dos valores
  const calculateDifference = (current: number, previous: number) => {
    if (previous === 0) return 100
    return ((current - previous) / previous) * 100
  }

  // Datos simulados para comparación
  const comparisonData = [
    {
      metric: "Visitas totales",
      internal: totalVisits,
      analytics: analyticsData?.userMetrics.totalUsers || 0,
      difference: calculateDifference(totalVisits, analyticsData?.userMetrics.totalUsers || 0),
    },
    {
      metric: "Visitas hoy",
      internal: todayVisits,
      analytics: Math.round((analyticsData?.userMetrics.totalUsers || 0) / 30), // Estimación diaria
      difference: calculateDifference(todayVisits, Math.round((analyticsData?.userMetrics.totalUsers || 0) / 30)),
    },
    {
      metric: "Usuarios en línea",
      internal: onlineUsers,
      analytics: Math.round((analyticsData?.userMetrics.totalUsers || 0) / 300), // Estimación de usuarios en línea
      difference: calculateDifference(onlineUsers, Math.round((analyticsData?.userMetrics.totalUsers || 0) / 300)),
    },
  ]

  // Renderizar el indicador de diferencia
  const renderDifferenceIndicator = (difference: number) => {
    // Si la diferencia es pequeña (menos del 10%), considerarla como similar
    if (Math.abs(difference) < 10) {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="mr-1 h-3 w-3" />
          <span className="text-xs">Similar</span>
        </div>
      )
    }

    if (difference > 0) {
      return (
        <div className="flex items-center text-green-500">
          <ArrowUpRight className="mr-1 h-3 w-3" />
          <span className="text-xs">{Math.abs(difference).toFixed(1)}% más</span>
        </div>
      )
    }

    return (
      <div className="flex items-center text-red-500">
        <ArrowDownRight className="mr-1 h-3 w-3" />
        <span className="text-xs">{Math.abs(difference).toFixed(1)}% menos</span>
      </div>
    )
  }

  const isLoading = isLoadingAnalytics || isLoadingVisitorStats

  return (
    <Card className={cn("bg-[#1C1C1C] border-[#7A7A7A]/20", className)}>
      <CardHeader>
        <CardTitle>Comparación de métricas</CardTitle>
        <CardDescription>Comparación entre nuestro sistema y Google Analytics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#7A7A7A]/20">
                <th className="pb-2 text-left font-medium">Métrica</th>
                <th className="pb-2 text-right font-medium">Sistema interno</th>
                <th className="pb-2 text-right font-medium">Google Analytics</th>
                <th className="pb-2 text-right font-medium">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-[#7A7A7A]">
                    Cargando datos...
                  </td>
                </tr>
              ) : (
                comparisonData.map((item, index) => (
                  <tr key={index} className="border-b border-[#7A7A7A]/10 last:border-0">
                    <td className="py-3">{item.metric}</td>
                    <td className="py-3 text-right font-medium">{item.internal.toLocaleString()}</td>
                    <td className="py-3 text-right text-[#7A7A7A]">{item.analytics.toLocaleString()}</td>
                    <td className="py-3 text-right">{renderDifferenceIndicator(item.difference)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[#7A7A7A]">
          Nota: Las diferencias pueden deberse a distintos métodos de conteo, filtros de bots, o configuraciones de
          privacidad.
        </p>
      </CardContent>
    </Card>
  )
}
