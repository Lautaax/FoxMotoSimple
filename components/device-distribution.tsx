"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalyticsDeviceCategory } from "@/lib/analytics-service"
import { cn } from "@/lib/utils"
import { Smartphone, Laptop, Tablet } from "lucide-react"

interface DeviceDistributionProps {
  data: AnalyticsDeviceCategory[]
  className?: string
}

export function DeviceDistribution({ data, className }: DeviceDistributionProps) {
  // Colores para cada tipo de dispositivo
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]

  // Obtener el icono según el tipo de dispositivo
  const getDeviceIcon = (deviceCategory: string) => {
    switch (deviceCategory) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "desktop":
        return <Laptop className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return null
    }
  }

  // Obtener el nombre formateado del dispositivo
  const getDeviceName = (deviceCategory: string) => {
    switch (deviceCategory) {
      case "mobile":
        return "Móvil"
      case "desktop":
        return "Escritorio"
      case "tablet":
        return "Tablet"
      default:
        return deviceCategory
    }
  }

  // Formatear los datos para el gráfico
  const chartData = data.map((item) => ({
    name: getDeviceName(item.deviceCategory),
    value: item.sessions,
    percentage: item.percentOfTotal,
    category: item.deviceCategory,
  }))

  // Componente personalizado para el tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg bg-[#252525] p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-[#7A7A7A]">
            {data.value.toLocaleString()} sesiones ({data.percentage.toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={cn("bg-[#1C1C1C] border-[#7A7A7A]/20", className)}>
      <CardHeader>
        <CardTitle>Distribución de dispositivos</CardTitle>
        <CardDescription>Tipos de dispositivos utilizados por los visitantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {chartData.map((device, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div
                className="mb-1 flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              >
                {getDeviceIcon(device.category)}
              </div>
              <p className="text-sm font-medium">{device.name}</p>
              <p className="text-xs text-[#7A7A7A]">{device.percentage.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
