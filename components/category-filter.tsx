"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get("categoria")

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams)

    if (categoryId) {
      params.set("categoria", categoryId)
    } else {
      params.delete("categoria")
    }

    params.delete("pagina") // Reset pagination
    router.push(`/tienda/catalogo?${params.toString()}`)
  }

  return (
    <div className="bg-[#2A2A2A] rounded-lg p-4">
      <h3 className="font-semibold mb-3 text-white">Categorías</h3>
      <div className="space-y-2">
        <Button
          variant={!selectedCategory ? "default" : "ghost"}
          onClick={() => handleCategoryChange(null)}
          className={`w-full justify-start ${
            !selectedCategory
              ? "bg-[#D32F2F] hover:bg-[#D32F2F]/80"
              : "text-[#7A7A7A] hover:text-white hover:bg-[#7A7A7A]/10"
          }`}
        >
          Todas las categorías
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            onClick={() => handleCategoryChange(category.id)}
            className={`w-full justify-start ${
              selectedCategory === category.id
                ? "bg-[#D32F2F] hover:bg-[#D32F2F]/80"
                : "text-[#7A7A7A] hover:text-white hover:bg-[#7A7A7A]/10"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
