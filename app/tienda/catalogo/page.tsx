"use client"

import { createClient } from "@/lib/supabase/client"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { SearchBar } from "@/components/search-bar"
import { SortFilter } from "@/components/sort-filter"
import { ViewToggle } from "@/components/view-toggle"
import { ProductList } from "@/components/product-list"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

interface SearchParams {
  categoria?: string
  buscar?: string
  pagina?: string
  orden?: string
}

function ProductsView({
  searchParams,
  view,
}: {
  searchParams: SearchParams
  view: "grid" | "list"
}) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const supabase = createClient()
      const currentPage = Number.parseInt(searchParams.pagina || "1")
      const itemsPerPage = 12
      const offset = (currentPage - 1) * itemsPerPage

      // Construir query base
      let query = supabase.from("products").select(`
          *,
          categories (
            name
          )
        `)

      // Aplicar filtros
      if (searchParams.categoria) {
        query = query.eq("category_id", searchParams.categoria)
      }

      if (searchParams.buscar) {
        query = query.ilike("name", `%${searchParams.buscar}%`)
      }

      // Aplicar ordenamiento
      switch (searchParams.orden) {
        case "name_asc":
          query = query.order("name", { ascending: true })
          break
        case "name_desc":
          query = query.order("name", { ascending: false })
          break
        case "price_asc":
          query = query.order("price", { ascending: true })
          break
        case "price_desc":
          query = query.order("price", { ascending: false })
          break
        case "stock_asc":
          query = query.order("stock", { ascending: true })
          break
        case "stock_desc":
          query = query.order("stock", { ascending: false })
          break
        default:
          query = query.order("created_at", { ascending: false })
      }

      const { data } = await query.range(offset, offset + itemsPerPage - 1)
      setProducts(data || [])
      setLoading(false)
    }

    loadProducts()
  }, [searchParams])

  if (loading) {
    return <ProductGridSkeleton />
  }

  if (view === "list") {
    return <ProductList products={products} />
  }

  return <ProductGrid searchParams={searchParams} />
}

export default function CatalogoPage() {
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<any[]>([])
  const [view, setView] = useState<"grid" | "list">("grid")

  // Convertir searchParams a objeto
  const searchParamsObj: SearchParams = {
    categoria: searchParams.get("categoria") || undefined,
    buscar: searchParams.get("buscar") || undefined,
    pagina: searchParams.get("pagina") || undefined,
    orden: searchParams.get("orden") || undefined,
  }

  useEffect(() => {
    async function loadCategories() {
      const supabase = createClient()
      const { data } = await supabase.from("categories").select("*").order("name")
      setCategories(data || [])
    }

    loadCategories()
  }, [])

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <div className="bg-[#2A2A2A]/50 border-b border-[#7A7A7A]/20">
        <div className="container px-4 md:px-6 py-6 md:py-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            Catálogo de <span className="text-[#D32F2F]">Productos</span>
          </h1>
          <p className="text-[#7A7A7A] text-base md:text-lg max-w-2xl">
            Encuentra todos los repuestos y accesorios que necesitas para tu moto. Productos de calidad con garantía.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-6 lg:space-y-0 lg:flex lg:gap-8">
          {/* Mobile filters - collapsible */}
          <div className="lg:hidden space-y-4">
            <SearchBar />
            <details className="bg-[#2A2A2A] rounded-lg border border-[#7A7A7A]/20">
              <summary className="p-4 cursor-pointer font-medium text-white">Filtrar por categoría</summary>
              <div className="px-4 pb-4">
                <CategoryFilter categories={categories} />
              </div>
            </details>
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block lg:w-64 space-y-6">
            <SearchBar />
            <CategoryFilter categories={categories} />
          </aside>

          {/* Grid de productos */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-semibold">Productos</h2>
              <div className="flex items-center gap-4">
                <SortFilter />
                <ViewToggle view={view} onViewChange={setView} />
              </div>
            </div>

            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductsView searchParams={searchParamsObj} view={view} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="bg-[#2A2A2A] rounded-lg p-4 md:p-6 animate-pulse">
          <div className="bg-[#7A7A7A]/20 aspect-square rounded-lg mb-4"></div>
          <div className="bg-[#7A7A7A]/20 h-4 md:h-6 rounded mb-2"></div>
          <div className="bg-[#7A7A7A]/20 h-3 md:h-4 rounded mb-4"></div>
          <div className="bg-[#7A7A7A]/20 h-6 md:h-8 rounded"></div>
        </div>
      ))}
    </div>
  )
}
