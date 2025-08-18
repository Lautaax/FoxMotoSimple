"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { AnalyticsTimelineData } from "@/lib/analytics-service"
import { cn } from "@/lib/utils"

interface AnalyticsChartProps {
  data: AnalyticsTimelineData[]
  title: string
  description?: string
  className?: string
  height?: number
  showMetrics?: Array<"users" | "sessions" | "pageViews">
}

export function AnalyticsChart({
  data,
  title,
  description,
  className,
  height = 400,
  showMetrics = ["users", "sessions", "pageViews"],
}: AnalyticsChartProps) {
  const [activeMetrics, setActiveMetrics] = useState<Record<string, boolean>>({
    users: showMetrics.includes("users"),
    sessions: showMetrics.includes("sessions"),
    pageViews: showMetrics.includes("pageViews"),
  })

  // Formatear fechas para mostrar solo el día
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).getDate().toString().padStart(2, "0"),
  }))

  // Configurar colores y etiquetas para las métricas
  const metricsConfig = {
    users: {
      label: "Usuarios",
      color: "hsl(var(--chart-1))",
    },
    sessions: {
      label: "Sesiones",
      color: "hsl(var(--chart-2))",
    },
    pageViews: {
      label: "Páginas vistas",
      color: "hsl(var(--chart-3))",
    },
  }

  // Filtrar solo las métricas activas
  const filteredConfig = Object.entries(metricsConfig).reduce(
    (acc, [key, value]) => {
      if (activeMetrics[key]) {
        acc[key] = value
      }
      return acc
    },
    {} as Record<string, { label: string; color: string }>,
  )

  // Manejar el cambio de estado de las métricas
  const toggleMetric = (metric: string) => {
    setActiveMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }))
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(metricsConfig).map(([key, { label, color }]) => (
            <button
              key={key}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activeMetrics[key]
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:hover:bg-gray-800/50",
              )}
              onClick={() => toggleMetric(key)}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeMetrics[key] ? color : "currentColor" }}
              />
              {label}
            </button>
          ))}
        </div>

        <ChartContainer config={filteredConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {activeMetrics.users && (
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  name="Usuarios"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              )}
              {activeMetrics.sessions && (
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="var(--color-sessions)"
                  name="Sesiones"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              )}
              {activeMetrics.pageViews && (
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="var(--color-pageViews)"
                  name="Páginas vistas"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
