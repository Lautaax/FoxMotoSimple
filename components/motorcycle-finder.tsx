"use client"

import { useState } from "react"

interface MotorcycleFinderProps {
  className?: string
}

export function MotorcycleFinder({ className }: MotorcycleFinderProps) {
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Datos simulados
  const brands = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "Bajaj", "Motomel", "Zanella", "Corven"]

  const modelsByBrand: Record<string, string[]> = {
    Honda: ["Wave", "CG Titan", "XR 150", "CB 190", "Tornado", "XRE 300", "CBR 300"],
    Yamaha: ["FZ 16", "YBR 125", "XTZ 125", "XTZ 250", "MT-03", "MT-07", "R3"],
    Suzuki: ["GN 125", "EN 125", "Gixxer", "V-Strom", "GSX-R150", "GSX-S150"],
    Kawasaki: ["Ninja 400", "Z400", "Versys 300", "Ninja 650", "Z650", "Versys 650"],
    Bajaj: ["Rouser 200NS", "Rouser 200RS", "Dominar 400", "Boxer", "Pulsar 135"],
    Motomel: ["CG 150", "Skua 150", "Skua 250", "S2 150", "Sirius 150", "Strato Euro 150"],
    Zanella: ["RX 150", "ZB 110", "Styler 150", "Patagonian Eagle 250", "Ceccato 60"],
    Corven: ["Energy 110", "Triax 150", "Triax 250", "Hunter 150", "TXR 250"],
  }

  const years = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString())

  const handleSearch = () => {
    if (!brand || !model || !year) return

    setIsSearching(true)

    // Simulación de búsqueda
    setTimeout(() => {
      // Aquí iría la redirección a la página de resultados
      console.log(`Buscando repuestos para ${brand} ${model} ${year}`)
      setIsSearching(false)

      // Resetear después de la búsqueda (opcional)
      // setBrand("")
      // setModel("")
      // setYear("")
    }, 1500)
  }

  return null
}
