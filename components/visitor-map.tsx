"use client"

import { useState, useEffect, useRef } from "react"
import { useVisitorStats } from "@/hooks/use-visitor-stats"
import { getCountryFlag } from "@/lib/geo-service"
import { cn } from "@/lib/utils"

interface VisitorMapProps {
  className?: string
  height?: number
  showTopCountries?: boolean
}

export function VisitorMap({ className, height = 300, showTopCountries = true }: VisitorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { recentLocations, topCountries, isLoading } = useVisitorStats()
  const [mapLoaded, setMapLoaded] = useState(false)

  // Cargar el mapa cuando el componente se monte
  useEffect(() => {
    // Verificar si ya existe el script de Leaflet
    if (!document.getElementById("leaflet-script") && !window.L) {
      // Cargar CSS de Leaflet
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(linkElement)

      // Cargar script de Leaflet
      const script = document.createElement("script")
      script.id = "leaflet-script"
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.onload = () => setMapLoaded(true)
      document.body.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  // Inicializar el mapa cuando Leaflet esté cargado
  useEffect(() => {
    if (!mapLoaded || isLoading || !mapRef.current) return

    // Acceder a la API de Leaflet
    const L = window.L

    // Crear el mapa si no existe
    if (!mapRef.current.hasChildNodes()) {
      // Inicializar el mapa
      const map = L.map(mapRef.current, {
        center: [20, 0], // Centrar en el mundo
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: true,
        attributionControl: false,
      })

      // Añadir capa de mapa oscuro
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      // Guardar referencia al mapa
      mapRef.current.mapInstance = map
    }

    const map = mapRef.current.mapInstance

    // Limpiar marcadores existentes
    if (map.markersLayer) {
      map.markersLayer.clearLayers()
    } else {
      map.markersLayer = L.layerGroup().addTo(map)
    }

    // Añadir marcadores para cada ubicación
    if (recentLocations && recentLocations.length > 0) {
      recentLocations.forEach((location) => {
        if (location && location.latitude && location.longitude) {
          // Crear icono personalizado
          const icon = L.divIcon({
            className: "visitor-marker",
            html: `<div class="w-3 h-3 bg-[#D32F2F] rounded-full animate-ping-slow"></div>`,
            iconSize: [12, 12],
          })

          // Crear marcador
          const marker = L.marker([location.latitude, location.longitude], { icon })
            .addTo(map.markersLayer)
            .bindPopup(
              `<div class="text-center">
                <div class="font-bold">${location.city}, ${location.country}</div>
                <div class="text-xs text-gray-500">Visitante activo</div>
              </div>`,
            )
        }
      })
    } else if (!isLoading) {
      // Si no hay ubicaciones y no estamos cargando, mostrar un mensaje
      const noDataMarker = L.marker([0, 0])
        .addTo(map.markersLayer)
        .bindPopup(
          `<div class="text-center">
            <div class="font-bold">No hay datos de ubicación disponibles</div>
            <div class="text-xs text-gray-500">Los visitantes aparecerán aquí</div>
          </div>`,
        )
    }
  }, [mapLoaded, isLoading, recentLocations])

  return (
    <div className={cn("bg-[#1C1C1C] p-4 rounded-lg border border-[#7A7A7A]/20", className)}>
      <h3 className="text-lg font-bold mb-3">Mapa de Visitantes</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`md:col-span-${showTopCountries ? "2" : "3"}`}>
          <div
            ref={mapRef}
            className={cn("bg-[#252525] rounded-lg overflow-hidden", isLoading ? "animate-pulse" : "")}
            style={{ height: `${height}px` }}
          >
            {!mapLoaded && (
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-[#7A7A7A]">Cargando mapa...</span>
              </div>
            )}
          </div>
        </div>

        {showTopCountries && (
          <div className="md:col-span-1">
            <div className="bg-[#252525] rounded-lg p-4 h-full">
              <h4 className="font-medium text-sm mb-3">Países más activos</h4>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-6 bg-[#1C1C1C] animate-pulse rounded"></div>
                  ))}
                </div>
              ) : topCountries.length > 0 ? (
                <ul className="space-y-2">
                  {topCountries.map((country, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={getCountryFlag(country.country === "Desconocido" ? "xx" : country.country)}
                          alt={country.country}
                          width={20}
                          height={15}
                          className="rounded-sm"
                        />
                        <span>{country.country}</span>
                      </div>
                      <span className="text-[#7A7A7A]">{country.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#7A7A7A] text-sm">No hay datos disponibles</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-[#7A7A7A] text-center">
        Los puntos rojos representan visitantes activos en este momento
      </div>
    </div>
  )
}
