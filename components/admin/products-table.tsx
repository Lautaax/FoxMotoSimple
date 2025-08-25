"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2, Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  sku: string | null
  brand: string | null
  is_active: boolean
  image_url: string | null
  categories?: {
    id: string
    name: string
  } | null
}

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      return
    }

    setIsDeleting(productId)
    try {
      const { error } = await supabase.from("products").delete().eq("id", productId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Error al eliminar el producto")
    } finally {
      setIsDeleting(null)
    }
  }

  const toggleActive = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("products").update({ is_active: !currentStatus }).eq("id", productId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error updating product status:", error)
      alert("Error al actualizar el estado del producto")
    }
  }

  return (
    <div className="rounded-md border border-gray-800">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800">
            <TableHead className="text-gray-300">Imagen</TableHead>
            <TableHead className="text-gray-300">Producto</TableHead>
            <TableHead className="text-gray-300">Categoría</TableHead>
            <TableHead className="text-gray-300">Precio</TableHead>
            <TableHead className="text-gray-300">Stock</TableHead>
            <TableHead className="text-gray-300">Estado</TableHead>
            <TableHead className="text-gray-300">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-gray-800">
              <TableCell>
                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-800">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=48&width=48&query=producto"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-white">{product.name}</p>
                  {product.brand && <p className="text-sm text-gray-400">{product.brand}</p>}
                  {product.sku && <p className="text-xs text-gray-500">SKU: {product.sku}</p>}
                </div>
              </TableCell>
              <TableCell>
                {product.categories ? (
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                    {product.categories.name}
                  </Badge>
                ) : (
                  <span className="text-gray-500">Sin categoría</span>
                )}
              </TableCell>
              <TableCell className="text-white">${product.price.toLocaleString("es-AR")}</TableCell>
              <TableCell>
                <span className={`font-medium ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => toggleActive(product.id, product.is_active)}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.is_active ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                  }`}
                >
                  {product.is_active ? "Activo" : "Inactivo"}
                </button>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/tienda/catalogo/${product.id}`}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver producto
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/tienda/admin/products/${product.id}/edit`}
                        className="flex items-center text-gray-300 hover:text-white"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(product.id)}
                      disabled={isDeleting === product.id}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {isDeleting === product.id ? "Eliminando..." : "Eliminar"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
