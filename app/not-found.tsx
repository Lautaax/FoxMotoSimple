import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1C1C1C] text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Página no encontrada</h2>
        <p className="text-[#7A7A7A] mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <Button asChild className="bg-[#D32F2F] hover:bg-[#D32F2F]/80">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
