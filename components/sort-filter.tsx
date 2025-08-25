"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sortOptions = [
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
  { value: "price-asc", label: "Precio menor a mayor" },
  { value: "price-desc", label: "Precio mayor a menor" },
  { value: "stock-desc", label: "Mayor stock" },
  { value: "stock-asc", label: "Menor stock" },
  { value: "newest", label: "Más recientes" },
]

export function SortFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("orden") || "name-asc"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "name-asc") {
      params.delete("orden")
    } else {
      params.set("orden", value)
    }
    params.delete("pagina") // Reset pagination when sorting
    router.push(`/tienda/catalogo?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[#7A7A7A] whitespace-nowrap">Ordenar por:</span>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] bg-[#2A2A2A] border-[#7A7A7A]/20 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#2A2A2A] border-[#7A7A7A]/20">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-white hover:bg-[#7A7A7A]/20">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
