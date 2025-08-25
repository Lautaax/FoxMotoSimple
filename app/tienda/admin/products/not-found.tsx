import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <Package className="h-24 w-24 text-gray-600 mx-auto" />
        <div>
          <h1 className="text-4xl font-bold mb-2">Producto no encontrado</h1>
          <p className="text-gray-400 text-lg">El producto que intentas editar no existe.</p>
        </div>
        <Link href="/tienda/admin/products">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a productos
          </Button>
        </Link>
      </div>
    </div>
  )
}
