"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "./product-card"
import { Pagination } from "./pagination"

interface SearchParams {
  categoria?: string
  buscar?: string
  pagina?: string
  orden?: string
}

interface ProductGridProps {
  searchParams: SearchParams
}

const PRODUCTS_PER_PAGE = 12

export function ProductGrid({ searchParams }: ProductGridProps) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [count, setCount] = useState(0)

  const supabase = createClient()

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)

        const page = Number.parseInt(searchParams.pagina || "1")
        const offset = (page - 1) * PRODUCTS_PER_PAGE

        let query = supabase
          .from("products")
          .select(
            `
            *,
            wholesale_price,
            categories (
              id,
              name
            )
          `,
            { count: "exact" },
          )
          .eq("is_active", true)

        // Filtrar por categoría
        if (searchParams.categoria) {
          query = query.eq("category_id", searchParams.categoria)
        }

        // Filtrar por búsqueda
        if (searchParams.buscar) {
          query = query.or(
            `name.ilike.%${searchParams.buscar}%,description.ilike.%${searchParams.buscar}%,brand.ilike.%${searchParams.buscar}%`,
          )
        }

        const sortOrder = searchParams.orden || "name-asc"
        switch (sortOrder) {
          case "name-asc":
            query = query.order("name", { ascending: true })
            break
          case "name-desc":
            query = query.order("name", { ascending: false })
            break
          case "price-asc":
            query = query.order("price", { ascending: true })
            break
          case "price-desc":
            query = query.order("price", { ascending: false })
            break
          case "stock-asc":
            query = query.order("stock", { ascending: true })
            break
          case "stock-desc":
            query = query.order("stock", { ascending: false })
            break
          case "newest":
            query = query.order("created_at", { ascending: false })
            break
          default:
            query = query.order("name", { ascending: true })
        }

        // Paginación
        query = query.range(offset, offset + PRODUCTS_PER_PAGE - 1)

        const { data, error: queryError, count: totalCount } = await query

        if (queryError) {
          setError("Error al cargar productos")
          return
        }

        setProducts(data || [])
        setCount(totalCount || 0)
      } catch (err) {
        setError("Error al cargar productos")
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [searchParams.categoria, searchParams.buscar, searchParams.pagina, searchParams.orden])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF0000] mx-auto"></div>
        <p className="text-[#7A7A7A] mt-4">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#7A7A7A] text-lg">No se encontraron productos</p>
        <p className="text-[#7A7A7A] text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
      </div>
    )
  }

  const page = Number.parseInt(searchParams.pagina || "1")
  const totalPages = Math.ceil(count / PRODUCTS_PER_PAGE)

  return (
    <div className="space-y-8">
      {/* Resultados info */}
      <div className="flex items-center justify-between">
        <p className="text-[#7A7A7A]">
          Mostrando {products.length} de {count} productos
        </p>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} searchParams={searchParams} />}
    </div>
  )
}
