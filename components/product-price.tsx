"use client"

import { useUserProfile } from "@/hooks/use-user-profile"
import { Badge } from "@/components/ui/badge"

interface ProductPriceProps {
  regularPrice: number
  wholesalePrice?: number | null
  showBadge?: boolean
  className?: string
}

export function ProductPrice({ regularPrice, wholesalePrice, showBadge = false, className = "" }: ProductPriceProps) {
  const { isWholesale, loading } = useUserProfile()

  if (loading) {
    return <div className={`animate-pulse bg-gray-600 h-6 w-20 rounded ${className}`} />
  }

  const currentPrice = isWholesale && wholesalePrice ? wholesalePrice : regularPrice
  const hasDiscount = isWholesale && wholesalePrice && wholesalePrice < regularPrice

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex flex-col">
        <p className="text-xl font-bold text-[#D32F2F]">${currentPrice.toLocaleString("es-AR")}</p>
        {hasDiscount && <p className="text-sm text-[#7A7A7A] line-through">${regularPrice.toLocaleString("es-AR")}</p>}
      </div>

      {showBadge && isWholesale && (
        <Badge className="bg-orange-600/10 text-orange-500 border-orange-500/20 text-xs">Precio Mayorista</Badge>
      )}
    </div>
  )
}
