// Declaración de tipos para la API de Leaflet
interface Window {
  L: any
  dataLayer: any[]
  gtag: (...args: any[]) => void
}

// Extender HTMLDivElement para incluir la instancia del mapa
interface HTMLDivElement {
  mapInstance?: any
}
