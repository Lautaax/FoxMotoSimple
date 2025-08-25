import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
  category_id: string
  categories?: {
    name: string
  }
}

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#7A7A7A] text-lg">No se encontraron productos.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-[#2A2A2A] rounded-lg border border-[#7A7A7A]/20 p-4 hover:border-[#D32F2F]/50 transition-colors"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Imagen del producto */}
            <div className="w-full sm:w-32 h-32 flex-shrink-0">
              <Link href={`/tienda/catalogo/${product.id}`}>
                <Image
                  src={product.image_url || "/placeholder.svg?height=128&width=128"}
                  alt={product.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Información del producto */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div className="flex-1">
                  <Link href={`/tienda/catalogo/${product.id}`}>
                    <h3 className="font-semibold text-white hover:text-[#D32F2F] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  {product.categories && <p className="text-sm text-[#7A7A7A] mt-1">{product.categories.name}</p>}
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-[#D32F2F]">${product.price.toLocaleString()}</p>
                </div>
              </div>

              <p className="text-[#7A7A7A] text-sm mb-3 line-clamp-2">{product.description}</p>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                {/* Stock */}
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-400">{product.stock} unidades disponibles</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-400">Sin stock</span>
                    </>
                  )}
                </div>

                {/* Botón agregar al carrito */}
                <AddToCartButton product={product} disabled={product.stock === 0} className="w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
