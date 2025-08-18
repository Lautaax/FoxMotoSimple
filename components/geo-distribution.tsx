"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalyticsGeoData } from "@/lib/analytics-service"
import { getCountryFlag } from "@/lib/geo-service"
import { cn } from "@/lib/utils"

interface GeoDistributionProps {
  data: AnalyticsGeoData[]
  className?: string
}

export function GeoDistribution({ data, className }: GeoDistributionProps) {
  const [view, setView] = useState<"country" | "region" | "city">("country")

  // Agrupar datos por país
  const countryData = data.reduce(
    (acc, item) => {
      const existingCountry = acc.find((country) => country.country === item.country)
      if (existingCountry) {
        existingCountry.users += item.users
        existingCountry.percentOfTotal += item.percentOfTotal
      } else {
        acc.push({
          country: item.country,
          users: item.users,
          percentOfTotal: item.percentOfTotal,
        })
      }
      return acc
    },
    [] as Array<{ country: string; users: number; percentOfTotal: number }>,
  )

  // Agrupar datos por región
  const regionData = data.reduce(
    (acc, item) => {
      const key = `${item.country}-${item.region}`
      const existingRegion = acc.find((region) => region.key === key)
      if (existingRegion) {
        existingRegion.users += item.users
        existingRegion.percentOfTotal += item.percentOfTotal
      } else {
        acc.push({
          key,
          country: item.country,
          region: item.region,
          users: item.users,
          percentOfTotal: item.percentOfTotal,
        })
      }
      return acc
    },
    [] as Array<{ key: string; country: string; region: string; users: number; percentOfTotal: number }>,
  )

  // Ordenar datos
  countryData.sort((a, b) => b.users - a.users)
  regionData.sort((a, b) => b.users - a.users)
  const sortedCityData = [...data].sort((a, b) => b.users - a.users)

  // Obtener el código de país para la bandera
  const getCountryCode = (country: string) => {
    switch (country) {
      case "Argentina":
        return "ar"
      case "Chile":
        return "cl"
      case "Uruguay":
        return "uy"
      case "España":
        return "es"
      case "México":
        return "mx"
      case "Colombia":
        return "co"
      case "Perú":
        return "pe"
      case "Brasil":
        return "br"
      default:
        return "xx"
    }
  }

  // Renderizar la vista actual
  const renderView = () => {
    switch (view) {
      case "country":
        return (
          <div className="space-y-4">
            {countryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getCountryFlag(getCountryCode(item.country)) || "/placeholder.svg"}
                    alt={item.country}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <span>{item.country}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.users.toLocaleString()}</p>
                  <p className="text-xs text-[#7A7A7A]">{item.percentOfTotal.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        )
      case "region":
        return (
          <div className="space-y-4">
            {regionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getCountryFlag(getCountryCode(item.country)) || "/placeholder.svg"}
                    alt={item.country}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <div>
                    <p>{item.region}</p>
                    <p className="text-xs text-[#7A7A7A]">{item.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.users.toLocaleString()}</p>
                  <p className="text-xs text-[#7A7A7A]">{item.percentOfTotal.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        )
      case "city":
        return (
          <div className="space-y-4">
            {sortedCityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getCountryFlag(getCountryCode(item.country)) || "/placeholder.svg"}
                    alt={item.country}
                    width={20}
                    height={15}
                    className="rounded-sm"
                  />
                  <div>
                    <p>{item.city}</p>
                    <p className="text-xs text-[#7A7A7A]">
                      {item.region}, {item.country}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.users.toLocaleString()}</p>
                  <p className="text-xs text-[#7A7A7A]">{item.percentOfTotal.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <Card className={cn("bg-[#1C1C1C] border-[#7A7A7A]/20", className)}>
      <CardHeader>
        <CardTitle>Distribución geográfica</CardTitle>
        <CardDescription>Ubicación de los visitantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex space-x-2">
          <button
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              view === "country"
                ? "bg-[#D32F2F] text-white"
                : "bg-[#252525] text-[#7A7A7A] hover:bg-[#303030] hover:text-white",
            )}
            onClick={() => setView("country")}
          >
            País
          </button>
          <button
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              view === "region"
                ? "bg-[#D32F2F] text-white"
                : "bg-[#252525] text-[#7A7A7A] hover:bg-[#303030] hover:text-white",
            )}
            onClick={() => setView("region")}
          >
            Región
          </button>
          <button
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              view === "city"
                ? "bg-[#D32F2F] text-white"
                : "bg-[#252525] text-[#7A7A7A] hover:bg-[#303030] hover:text-white",
            )}
            onClick={() => setView("city")}
          >
            Ciudad
          </button>
        </div>
        {renderView()}
      </CardContent>
    </Card>
  )
}
