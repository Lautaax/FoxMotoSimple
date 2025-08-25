import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <Package className="h-24 w-24 text-[#7A7A7A] mx-auto" />
        <div>
          <h1 className="text-4xl font-bold mb-2">Producto no encontrado</h1>
          <p className="text-[#7A7A7A] text-lg">El producto que buscas no existe o ha sido eliminado.</p>
        </div>
        <Link href="/tienda/catalogo">
          <Button className="bg-[#D32F2F] hover:bg-[#D32F2F]/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Button>
        </Link>
      </div>
    </div>
  )
}
