"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { AnalyticsChart } from "@/components/analytics-chart"
import { AnalyticsMetrics } from "@/components/analytics-metrics"
import { TrafficSources } from "@/components/traffic-sources"
import { TopPages } from "@/components/top-pages"
import { DeviceDistribution } from "@/components/device-distribution"
import { GeoDistribution } from "@/components/geo-distribution"
import { AnalyticsComparison } from "@/components/analytics-comparison"
import { VisitorMap } from "@/components/visitor-map"
import { VisitorCounter } from "@/components/visitor-counter"

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics()

  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
      {/* Header */}
      <header className="w-full border-b border-[#7A7A7A]/20 bg-[#1C1C1C]">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Volver al inicio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panel de Analytics</h1>
              <p className="text-[#7A7A7A]">Análisis detallado del tráfico y comportamiento de los usuarios</p>
            </div>
            <div className="mt-4 flex items-center gap-2 md:mt-0">
              <select className="rounded-md bg-[#252525] px-3 py-1 text-sm text-white">
                <option value="30">Últimos 30 días</option>
                <option value="7">Últimos 7 días</option>
                <option value="90">Últimos 90 días</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#D32F2F]/20 border-t-[#D32F2F]"></div>
                <p className="text-[#7A7A7A]">Cargando datos de analytics...</p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-500/10 p-4 text-center text-red-500">
              <p>Error al cargar los datos de analytics. Por favor, intenta de nuevo más tarde.</p>
            </div>
          ) : (
            <>
              {/* Métricas principales */}
              <AnalyticsMetrics data={data!.userMetrics} className="mb-6" />

              {/* Gráfico principal */}
              <AnalyticsChart
                data={data!.timeline}
                title="Tendencia de tráfico"
                description="Evolución de usuarios, sesiones y páginas vistas en los últimos 30 días"
                className="mb-6"
              />

              {/* Comparación de sistemas */}
              <AnalyticsComparison className="mb-6" />

              {/* Sección de dos columnas */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <TrafficSources data={data!.trafficSources} />
                <TopPages data={data!.topPages} />
              </div>

              {/* Sección de dos columnas */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <DeviceDistribution data={data!.deviceCategories} />
                <GeoDistribution data={data!.geoData} />
              </div>

              {/* Mapa de visitantes */}
              <div className="mt-6">
                <h2 className="mb-4 text-2xl font-bold">Datos del sistema interno</h2>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <VisitorMap height={400} />
                  </div>
                  <div>
                    <VisitorCounter variant="detailed" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="bg-[#1C1C1C] border-t border-[#7A7A7A]/20 py-8">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-[#7A7A7A]">
            &copy; {new Date().getFullYear()} Fox Motorepuestos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
