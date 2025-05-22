"use client"

import { useState } from "react"
import { SEOImage } from "@/components/seo-image"
import { generateImageMetadata } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface ProductImageProps {
  src: string
  alt: string
  brand?: string
  model?: string
  thumbnails?: Array<{ src: string; alt: string }>
  className?: string
}

export function ProductImage({ src, alt, brand, model, thumbnails = [], className }: ProductImageProps) {
  const [currentImage, setCurrentImage] = useState(src)
  const [currentAlt, setCurrentAlt] = useState(alt)

  // Generar metadatos optimizados para la imagen
  const metadata = generateImageMetadata({
    title: alt,
    context: alt,
    brand,
    model,
    category: "product",
  })

  // Cambiar la imagen principal
  const changeImage = (newSrc: string, newAlt: string) => {
    setCurrentImage(newSrc)
    setCurrentAlt(newAlt)
  }

  return (
    <div className={className}>
      {/* Imagen principal */}
      <div className="mb-4 overflow-hidden rounded-lg">
        <SEOImage
          src={currentImage}
          alt={currentAlt}
          width={metadata.width}
          height={metadata.height}
          priority={true}
          quality={90}
          className="aspect-square w-full"
        />
      </div>

      {/* Miniaturas */}
      {thumbnails.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            className={cn(
              "overflow-hidden rounded border-2",
              currentImage === src ? "border-[#D32F2F]" : "border-transparent",
            )}
            onClick={() => changeImage(src, alt)}
          >
            <SEOImage src={src} alt={alt} width={100} height={100} className="aspect-square h-16 w-16" schema={false} />
          </button>

          {thumbnails.map((thumb, index) => (
            <button
              key={index}
              className={cn(
                "overflow-hidden rounded border-2",
                currentImage === thumb.src ? "border-[#D32F2F]" : "border-transparent",
              )}
              onClick={() => changeImage(thumb.src, thumb.alt)}
            >
              <SEOImage
                src={thumb.src}
                alt={thumb.alt}
                width={100}
                height={100}
                className="aspect-square h-16 w-16"
                schema={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
