"use client"

import type React from "react"

import { useState } from "react"
import { SEOImage } from "@/components/seo-image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateImageMetadata } from "@/lib/image-utils"

interface BlogImage {
  src: string
  alt: string
  caption?: string
  attribution?: string
  width?: number
  height?: number
}

interface BlogImageGalleryProps {
  images: BlogImage[]
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: "small" | "medium" | "large"
  lightbox?: boolean
  articleContext?: boolean
}

export function BlogImageGallery({
  images,
  className,
  columns = 2,
  gap = "medium",
  lightbox = true,
  articleContext = true,
}: BlogImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Configurar clases para el grid según el número de columnas
  const gridColumns = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  // Configurar clases para el gap
  const gapSize = {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  }

  // Abrir lightbox
  const openLightbox = (index: number) => {
    if (lightbox) {
      setCurrentImageIndex(index)
      setLightboxOpen(true)
      // Prevenir scroll
      document.body.style.overflow = "hidden"
    }
  }

  // Cerrar lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    // Restaurar scroll
    document.body.style.overflow = "auto"
  }

  // Navegar a la imagen anterior
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Navegar a la imagen siguiente
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Manejar teclas para navegación
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!lightboxOpen) return

    switch (e.key) {
      case "ArrowLeft":
        prevImage()
        break
      case "ArrowRight":
        nextImage()
        break
      case "Escape":
        closeLightbox()
        break
    }
  }

  return (
    <div className={className} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Grid de imágenes */}
      <div className={cn("grid", gridColumns[columns], gapSize[gap])}>
        {images.map((image, index) => {
          // Generar metadatos optimizados para cada imagen
          const metadata = generateImageMetadata({
            title: image.alt,
            context: image.alt,
            index,
          })

          return (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-lg",
                lightbox && "cursor-pointer transition-transform hover:scale-[1.02]",
              )}
              onClick={() => openLightbox(index)}
            >
              <SEOImage
                src={image.src}
                alt={image.alt}
                width={image.width || metadata.width}
                height={image.height || metadata.height}
                caption={image.caption}
                attribution={image.attribution}
                priority={index === 0}
                quality={90}
                className="aspect-video w-full"
                articleContext={articleContext}
              />
              {lightbox && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity hover:bg-black/30 hover:opacity-100">
                  <ZoomIn className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <SEOImage
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              width={1200}
              height={800}
              caption={images[currentImageIndex].caption}
              attribution={images[currentImageIndex].attribution}
              priority={true}
              quality={100}
              className="max-h-[80vh] w-auto"
              objectFit="contain"
              schema={false} // No necesitamos schema duplicado en el lightbox
            />
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
