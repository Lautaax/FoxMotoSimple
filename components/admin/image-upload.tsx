"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const uploadImage = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al subir la imagen")
      }

      const data = await response.json()
      onChange(data.url)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error al subir la imagen. Por favor, intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.")
      return
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen es demasiado grande. El tamaño máximo es 5MB.")
      return
    }

    uploadImage(file)
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (disabled || isUploading) return

      handleFileSelect(e.dataTransfer.files)
    },
    [disabled, isUploading, handleFileSelect],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const removeImage = () => {
    onChange("")
  }

  return (
    <div className="space-y-4">
      <Label className="text-white">Imagen del producto</Label>

      {value ? (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="relative">
              <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={value || "/placeholder.svg"}
                  alt="Imagen del producto"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
                disabled={disabled || isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={disabled || isUploading}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Cambiar imagen
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`bg-gray-800 border-gray-700 border-2 border-dashed transition-colors ${
            dragActive ? "border-orange-500 bg-orange-500/10" : "border-gray-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {isUploading ? "Subiendo imagen..." : "Subir imagen del producto"}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                </p>
                <p className="text-gray-500 text-xs">PNG, JPG, JPEG hasta 5MB</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={disabled || isUploading}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Seleccionar imagen
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  )
}
