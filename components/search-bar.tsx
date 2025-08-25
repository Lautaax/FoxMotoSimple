"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("buscar") || "")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const supabase = createClient()

  useEffect(() => {
    const saved = localStorage.getItem("recent-searches")
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5))
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        try {
          const { data } = await supabase
            .from("products")
            .select("name, brand")
            .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`)
            .eq("is_active", true)
            .limit(5)

          if (data) {
            const uniqueSuggestions = Array.from(
              new Set([...data.map((p) => p.name), ...data.filter((p) => p.brand).map((p) => p.brand!)]),
            ).slice(0, 5)
            setSuggestions(uniqueSuggestions)
            setShowSuggestions(true)
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, supabase])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchTerm)
  }

  const performSearch = (term: string) => {
    if (!term.trim()) return

    const params = new URLSearchParams(searchParams)
    params.set("buscar", term.trim())
    params.delete("pagina")

    const updatedRecent = [term.trim(), ...recentSearches.filter((s) => s !== term.trim())].slice(0, 5)
    setRecentSearches(updatedRecent)
    localStorage.setItem("recent-searches", JSON.stringify(updatedRecent))

    setShowSuggestions(false)
    router.push(`/tienda/catalogo?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setSuggestions([])
    setShowSuggestions(false)
    const params = new URLSearchParams(searchParams)
    params.delete("buscar")
    params.delete("pagina")
    router.push(`/tienda/catalogo?${params.toString()}`)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    performSearch(suggestion)
  }

  return (
    <div className="bg-[#2A2A2A] rounded-lg p-4 relative">
      <h3 className="font-semibold mb-3 text-white">Buscar productos</h3>
      <form onSubmit={handleSearch} className="space-y-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar por nombre, marca o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (searchTerm.length >= 2) setShowSuggestions(true)
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow clicks
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            className="bg-[#1C1C1C] border-[#7A7A7A]/20 text-white pr-10"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1C1C1C] border border-[#7A7A7A]/20 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.length > 0 && (
                <div className="p-2">
                  <div className="text-xs text-[#7A7A7A] mb-2 px-2">Sugerencias</div>
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 text-white hover:bg-[#2A2A2A] rounded text-sm"
                    >
                      <Search className="h-3 w-3 inline mr-2 text-[#7A7A7A]" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {recentSearches.length > 0 && searchTerm.length < 2 && (
                <div className="p-2 border-t border-[#7A7A7A]/20">
                  <div className="text-xs text-[#7A7A7A] mb-2 px-2">Búsquedas recientes</div>
                  {recentSearches.map((recent, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(recent)}
                      className="w-full text-left px-3 py-2 text-white hover:bg-[#2A2A2A] rounded text-sm"
                    >
                      <Clock className="h-3 w-3 inline mr-2 text-[#7A7A7A]" />
                      {recent}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full bg-[#D32F2F] hover:bg-[#D32F2F]/80">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </form>
    </div>
  )
}
