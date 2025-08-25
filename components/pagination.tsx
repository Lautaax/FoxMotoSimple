"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}

export function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(urlSearchParams)
    params.set("pagina", page.toString())
    return `/tienda/catalogo?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(createPageUrl(currentPage - 1))}
        disabled={currentPage <= 1}
        className="border-gray-700 text-gray-300 hover:bg-gray-800"
      >
        <ChevronLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber
          if (totalPages <= 5) {
            pageNumber = i + 1
          } else if (currentPage <= 3) {
            pageNumber = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i
          } else {
            pageNumber = currentPage - 2 + i
          }

          return (
            <Button
              key={pageNumber}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              onClick={() => router.push(createPageUrl(pageNumber))}
              className={
                currentPage === pageNumber
                  ? "bg-[#D32F2F] hover:bg-[#D32F2F]/80"
                  : "border-gray-700 text-gray-300 hover:bg-gray-800"
              }
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(createPageUrl(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="border-gray-700 text-gray-300 hover:bg-gray-800"
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
