"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { VisitorCounter } from "@/components/visitor-counter"
import { VisitorMap } from "@/components/visitor-map"

export default function StatsPage() {
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
          <h1 className="text-3xl font-bold mb-8">Estadísticas de Visitantes</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <VisitorCounter variant="detailed" />
            <VisitorCounter variant="geo" />
          </div>

          <div className="mb-6">
            <VisitorMap height={400} />
          </div>

          <div className="bg-[#1C1C1C] p-4 rounded-lg border border-[#7A7A7A]/20">
            <h3 className="text-lg font-bold mb-3">Acerca de las Estadísticas</h3>
            <p className="text-[#7A7A7A] mb-4">
              Esta página muestra estadísticas en tiempo real de los visitantes de Fox Motorepuestos. Los datos
              incluyen:
            </p>
            <ul className="list-disc list-inside text-[#7A7A7A] space-y-2 mb-4">
              <li>Número total de visitas al sitio</li>
              <li>Visitas recibidas hoy</li>
              <li>Usuarios actualmente navegando el sitio</li>
              <li>Distribución geográfica de los visitantes</li>
              <li>Mapa en tiempo real de visitantes activos</li>
            </ul>
            <p className="text-[#7A7A7A] text-sm">
              Nota: Estos datos se recopilan de forma anónima y se utilizan únicamente con fines estadísticos. No
              almacenamos información personal de los visitantes.
            </p>
          </div>
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
