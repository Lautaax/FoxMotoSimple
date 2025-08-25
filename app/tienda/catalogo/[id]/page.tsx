"use client"

import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductPrice } from "@/components/product-price"
import { RelatedProducts } from "@/components/related-products"
import { Package, Truck, Shield, ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Obtener producto con categoría
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      wholesale_price,
      categories (
        id,
        name
      )
    `)
    .eq("id", params.id)
    .eq("is_active", true)
    .single()

  if (error || !product) {
    notFound()
  }

  const handleWhatsAppContact = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent(
      `Hola! Me interesa el producto: ${product.name} (${product.sku}). ¿Podrían darme más información?`,
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      <div className="container px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#7A7A7A] mb-8">
          <Link href="/tienda/catalogo" className="hover:text-[#D32F2F] transition-colors">
            Catálogo
          </Link>
          <span>/</span>
          {product.categories && (
            <>
              <Link
                href={`/tienda/catalogo?categoria=${product.categories.id}`}
                className="hover:text-[#D32F2F] transition-colors"
              >
                {product.categories.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-white">{product.name}</span>
        </div>

        {/* Botón volver */}
        <Link
          href="/tienda/catalogo"
          className="inline-flex items-center gap-2 text-[#7A7A7A] hover:text-[#D32F2F] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#2A2A2A] rounded-lg overflow-hidden">
              <Image
                src={product.image_url || "/placeholder.svg?height=600&width=600&query=repuesto moto"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              {product.categories && (
                <Badge className="mb-3 bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">
                  {product.categories.name}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              {product.brand && (
                <p className="text-[#7A7A7A] text-lg mb-2">
                  Marca: <span className="text-white font-medium">{product.brand}</span>
                </p>
              )}
              {product.model && (
                <p className="text-[#7A7A7A] text-lg mb-4">
                  Modelo: <span className="text-white font-medium">{product.model}</span>
                </p>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Descripción</h3>
                <p className="text-[#7A7A7A] leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Precio y stock */}
            <div className="bg-[#2A2A2A] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <ProductPrice
                    regularPrice={product.price}
                    wholesalePrice={product.wholesale_price}
                    showBadge={true}
                    className="mb-2"
                  />
                  {product.sku && <p className="text-sm text-[#7A7A7A]">SKU: {product.sku}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#7A7A7A]">Stock disponible</p>
                  <p className={`font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                    {product.stock > 0 ? `${product.stock} unidades` : "Sin stock"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <AddToCartButton product={product} disabled={product.stock === 0} />
                <Button
                  onClick={handleWhatsAppContact}
                  variant="outline"
                  className="w-full border-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent hover:border-[#D32F2F] hover:text-[#D32F2F]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 text-[#D32F2F] mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Producto Original</h4>
                  <p className="text-sm text-[#7A7A7A]">Garantía de calidad</p>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
                <CardContent className="p-4 text-center">
                  <Truck className="h-8 w-8 text-[#D32F2F] mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Envío Disponible</h4>
                  <p className="text-sm text-[#7A7A7A]">Consultar costos</p>
                </CardContent>
              </Card>

              <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 text-[#D32F2F] mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Garantía</h4>
                  <p className="text-sm text-[#7A7A7A]">Según fabricante</p>
                </CardContent>
              </Card>
            </div>

            {/* Años de compatibilidad */}
            {(product.year_from || product.year_to) && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Compatibilidad</h3>
                <p className="text-[#7A7A7A]">
                  Años: {product.year_from || "N/A"} - {product.year_to || "Actual"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-16">
          <RelatedProducts categoryId={product.category_id} currentProductId={product.id} />
        </div>
      </div>
    </div>
  )
}
