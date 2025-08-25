import { ProductForm } from "@/components/admin/product-form"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewProductPage() {
  const supabase = await createClient()

  // Obtener categorías para el formulario
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tienda/admin/products" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Nuevo Producto</h1>
          <p className="text-gray-400">Agregar un nuevo producto al catálogo</p>
        </div>
      </div>

      <ProductForm categories={categories || []} />
    </div>
  )
}
