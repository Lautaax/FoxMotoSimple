"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Eye, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  image_url: string | null
  brand: string | null
  model: string | null
  categories?: {
    id: string
    name: string
  }
}

interface ProductQuickViewProps {
  product: Product
  trigger?: React.ReactNode
}

export function ProductQuickView({ product, trigger }: ProductQuickViewProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppContact = () => {
    const phoneNumber = "542915221351"
    const message = encodeURIComponent(
      `Hola! Me interesa el producto: ${product.name}. ¿Podrían darme más información?`,
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger || (
          <Button
            variant="outline"
            size="sm"
            className="border-[#7A7A7A] text-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent"
          >
            <Eye className="h-4 w-4 mr-2" />
            Vista rápida
          </Button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#1C1C1C] border-[#7A7A7A]/20 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">Vista rápida del producto</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="aspect-square bg-[#2A2A2A] rounded-lg overflow-hidden">
              <Image
                src={product.image_url || `/placeholder.svg?height=400&width=400&query=${product.name}`}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              {product.categories && (
                <Badge className="bg-[#D32F2F]/10 text-[#D32F2F] border-[#D32F2F]/20">{product.categories.name}</Badge>
              )}

              <h2 className="text-2xl font-bold text-white">{product.name}</h2>

              {product.brand && (
                <p className="text-[#7A7A7A]">
                  Marca: <span className="text-white">{product.brand}</span>
                </p>
              )}

              {product.model && (
                <p className="text-[#7A7A7A]">
                  Modelo: <span className="text-white">{product.model}</span>
                </p>
              )}

              {product.description && <p className="text-[#7A7A7A] leading-relaxed">{product.description}</p>}

              <div className="bg-[#2A2A2A] rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-[#D32F2F]">${product.price.toLocaleString("es-AR")}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                      {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
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

              <div className="flex gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-[#7A7A7A] text-[#7A7A7A] hover:bg-[#7A7A7A]/10 bg-transparent"
                >
                  <Link href={`/tienda/catalogo/${product.id}`}>Ver detalles completos</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
