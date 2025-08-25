import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductsTable } from "@/components/admin/products-table"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  // Obtener productos con categorías
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error al cargar productos: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Productos</h1>
          <p className="text-gray-400">Administra el catálogo de productos</p>
        </div>
        <Link href="/tienda/admin/products/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable products={products || []} />
        </CardContent>
      </Card>
    </div>
  )
}
