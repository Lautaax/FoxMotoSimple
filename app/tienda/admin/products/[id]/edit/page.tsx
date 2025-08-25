import { ProductForm } from "@/components/admin/product-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Obtener producto
  const { data: product, error } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (error || !product) {
    notFound()
  }

  // Obtener categorías
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tienda/admin/products" className="text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Editar Producto</h1>
          <p className="text-gray-400">Modificar información del producto</p>
        </div>
      </div>

      <ProductForm categories={categories || []} initialData={product} isEditing={true} />
    </div>
  )
}
