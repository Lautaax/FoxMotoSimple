"use client"

import { useState } from "react"
import { getCurrentEnvironment, config } from "@/lib/config"
import { getBaseUrl, getCanonicalUrl, getAssetUrl, getApiUrl, isDevelopment } from "@/lib/url-utils"

export function DebugEnvironment() {
  const [isVisible, setIsVisible] = useState(false)

  // Solo mostrar en entornos de desarrollo
  if (!isDevelopment()) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button onClick={() => setIsVisible(!isVisible)} className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
        {isVisible ? "Ocultar debug" : "Mostrar debug"}
      </button>

      {isVisible && (
        <div className="mt-2 p-4 bg-gray-800 text-white rounded-md text-xs w-80 max-h-96 overflow-auto">
          <h3 className="font-bold mb-2">Información de entorno</h3>
          <ul className="space-y-1">
            <li>
              <strong>Entorno:</strong> {getCurrentEnvironment()}
            </li>
            <li>
              <strong>Base URL:</strong> {getBaseUrl()}
            </li>
            <li>
              <strong>Canonical URL:</strong> {getCanonicalUrl()}
            </li>
            <li>
              <strong>Assets URL:</strong> {getAssetUrl("/example.png")}
            </li>
            <li>
              <strong>API URL:</strong> {getApiUrl("products")}
            </li>
            <li>
              <strong>HTTPS Enabled:</strong> {config.isHttpsEnabled ? "Sí" : "No"}
            </li>
            <li>
              <strong>Dominios permitidos:</strong>
              <ul className="ml-4 mt-1">
                {config.allowedDomains.map((domain, index) => (
                  <li key={index}>{domain}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
