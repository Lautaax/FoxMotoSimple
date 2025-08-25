import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "./add-to-cart-button"
import { ProductPrice } from "./product-price"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  wholesale_price?: number | null
  stock: number
  image_url: string | null
  sku: string | null
  brand: string | null
  categories?: {
    id: string
    name: string
  } | null
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20 hover:border-[#D32F2F]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#D32F2F]/10 group">
      <CardContent className="p-0">
        {/* Imagen */}
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <Link href={`/tienda/catalogo/${product.id}`}>
            <Image
              src={product.image_url || "/placeholder.svg?height=300&width=300&query=repuesto moto"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-3">
          {/* Categoría */}
          {product.categories && (
            <Badge className="bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20 text-xs">
              {product.categories.name}
            </Badge>
          )}

          {/* Título */}
          <Link href={`/tienda/catalogo/${product.id}`}>
            <h3 className="font-semibold text-white group-hover:text-[#D32F2F] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Marca */}
          {product.brand && <p className="text-sm text-[#7A7A7A]">{product.brand}</p>}

          {/* Descripción */}
          {product.description && <p className="text-sm text-[#7A7A7A] line-clamp-2">{product.description}</p>}

          {/* Precio y stock */}
          <div className="flex items-center justify-between">
            <div>
              {/* <CHANGE> Reemplazado precio estático con componente ProductPrice para precios diferenciados */}
              <ProductPrice 
                regularPrice={product.price} 
                wholesalePrice={product.wholesale_price}
                showBadge={true}
              />
              {product.sku && <p className="text-xs text-[#7A7A7A]">SKU: {product.sku}</p>}
            </div>
            <div className="text-right">
              {product.stock > 0 ? (
                <div>
                  <p className="text-sm font-medium text-green-500">En stock</p>
                  <p className="text-xs text-[#7A7A7A]">
                    {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
                  </p>
                </div>
              ) : (
                <p className="text-sm font-medium text-red-500">Sin stock</p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-2">
            <AddToCartButton product={product} disabled={product.stock === 0} size="sm" />
            <Link href={`/tienda/catalogo/${product.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent hover:border-[#D32F2F] hover:text-[#D32F2F]"
              >
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
