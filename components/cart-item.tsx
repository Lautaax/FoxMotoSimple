"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface CartItemProps {
  item: {
    id: string
    product_id: string
    quantity: number
    product: {
      id: string
      name: string
      price: number
      image_url: string | null
      stock: number
    }
  }
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsUpdating(true)
    try {
      await updateQuantity(item.id, newQuantity)
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")) {
      try {
        await removeItem(item.id)
      } catch (error) {
        console.error("Error removing item:", error)
      }
    }
  }

  const subtotal = item.product.price * item.quantity

  return (
    <Card className="bg-[#2A2A2A] border-[#7A7A7A]/20">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Imagen del producto */}
          <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-[#1C1C1C]">
            <Image
              src={item.product.image_url || "/placeholder.svg?height=80&width=80&query=producto"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Información del producto */}
          <div className="flex-1 space-y-2">
            <Link
              href={`/tienda/catalogo/${item.product.id}`}
              className="text-white font-medium hover:text-[#D32F2F] transition-colors"
            >
              {item.product.name}
            </Link>

            <p className="text-[#D32F2F] font-bold">${item.product.price.toLocaleString("es-AR")}</p>

            {item.product.stock < item.quantity && (
              <p className="text-red-400 text-sm">Stock insuficiente (disponible: {item.product.stock})</p>
            )}
          </div>

          {/* Controles de cantidad */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                className="h-8 w-8 p-0 border-[#7A7A7A] hover:bg-[#7A7A7A]/10"
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-8 text-center text-white font-medium">{item.quantity}</span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                disabled={item.quantity >= item.product.stock || isUpdating}
                className="h-8 w-8 p-0 border-[#7A7A7A] hover:bg-[#7A7A7A]/10"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-white font-bold">${subtotal.toLocaleString("es-AR")}</p>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
