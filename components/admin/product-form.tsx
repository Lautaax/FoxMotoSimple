"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import { createClient } from "@/lib/supabase/client"

interface Category {
  id: string
  name: string
}

interface Product {
  id?: string
  name: string
  description: string | null
  price: number
  wholesale_price?: number | null
  stock: number
  category_id: string | null
  image_url: string | null
  sku: string | null
  brand: string | null
  model: string | null
  year_from: number | null
  year_to: number | null
  is_active: boolean
}

interface ProductFormProps {
  categories: Category[]
  initialData?: Product
  isEditing?: boolean
}

export function ProductForm({ categories, initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Product>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    wholesale_price: initialData?.wholesale_price || null,
    stock: initialData?.stock || 0,
    category_id: initialData?.category_id || "",
    image_url: initialData?.image_url || "",
    sku: initialData?.sku || "",
    brand: initialData?.brand || "",
    model: initialData?.model || "",
    year_from: initialData?.year_from || null,
    year_to: initialData?.year_to || null,
    is_active: initialData?.is_active ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        wholesale_price: formData.wholesale_price ? Number(formData.wholesale_price) : null,
        stock: Number(formData.stock),
        year_from: formData.year_from ? Number(formData.year_from) : null,
        year_to: formData.year_to ? Number(formData.year_to) : null,
        category_id: formData.category_id || null,
      }

      if (isEditing && initialData?.id) {
        const { error } = await supabase.from("products").update(productData).eq("id", initialData.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("products").insert([productData])

        if (error) throw error
      }

      router.push("/tienda/admin/products")
      router.refresh()
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Error al guardar el producto")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información básica */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Nombre del producto *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-white">
                Categoría
              </Label>
              <Select
                value={formData.category_id || ""}
                onValueChange={(value) => handleInputChange("category_id", value)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-white">
                  Precio Regular *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="wholesale_price" className="text-white">
                  Precio Mayorista
                </Label>
                <Input
                  id="wholesale_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.wholesale_price || ""}
                  onChange={(e) => handleInputChange("wholesale_price", e.target.value || null)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Opcional"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="stock" className="text-white">
                Stock *
              </Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Detalles del producto */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Detalles del Producto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sku" className="text-white">
                SKU
              </Label>
              <Input
                id="sku"
                value={formData.sku || ""}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="brand" className="text-white">
                Marca
              </Label>
              <Input
                id="brand"
                value={formData.brand || ""}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="model" className="text-white">
                Modelo
              </Label>
              <Input
                id="model"
                value={formData.model || ""}
                onChange={(e) => handleInputChange("model", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year_from" className="text-white">
                  Año desde
                </Label>
                <Input
                  id="year_from"
                  type="number"
                  min="1900"
                  max="2030"
                  value={formData.year_from || ""}
                  onChange={(e) => handleInputChange("year_from", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="year_to" className="text-white">
                  Año hasta
                </Label>
                <Input
                  id="year_to"
                  type="number"
                  min="1900"
                  max="2030"
                  value={formData.year_to || ""}
                  onChange={(e) => handleInputChange("year_to", e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image_url" className="text-white">
                URL de imagen
              </Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url || ""}
                onChange={(e) => handleInputChange("image_url", e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange("is_active", checked)}
              />
              <Label htmlFor="is_active" className="text-white">
                Producto activo
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Imagen del Producto */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Imagen del Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            value={formData.image_url || ""}
            onChange={(url) => handleInputChange("image_url", url)}
            disabled={isLoading}
          />
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isLoading} className="bg-orange-600 hover:bg-orange-700">
          {isLoading ? "Guardando..." : isEditing ? "Actualizar Producto" : "Crear Producto"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/tienda/admin/products")}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
