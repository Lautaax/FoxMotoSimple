"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getAssetUrl } from "@/lib/url-utils"

interface SEOImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  loading?: "eager" | "lazy"
  quality?: number
  caption?: string
  attribution?: string
  blurDataURL?: string
  placeholder?: "blur" | "empty"
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  schema?: boolean
  articleContext?: boolean
  isDecorative?: boolean
}

export function SEOImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  loading,
  quality = 85,
  caption,
  attribution,
  blurDataURL,
  placeholder,
  objectFit = "cover",
  schema = true,
  articleContext = false,
  isDecorative = false,
}: SEOImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Asegurarse de que alt sea descriptivo a menos que sea decorativa
  const safeAlt = isDecorative ? "" : alt || "Imagen de Fox Motorepuestos"

  // Generar URL completa para schema.org
  const fullSrc = src.startsWith("http") ? src : getAssetUrl(src)

  // Generar schema.org para la imagen
  const imageSchema = schema
    ? {
        "@context": "https://schema.org",
        "@type": articleContext ? "ImageObject" : "ImageObject",
        contentUrl: fullSrc,
        name: safeAlt,
        description: caption || safeAlt,
        ...(attribution && { creditText: attribution }),
      }
    : null

  // Manejar errores de carga
  useEffect(() => {
    if (error) {
      console.error(`Error loading image: ${src}`)
    }
  }, [error, src])

  // Determinar el estilo de object-fit
  const objectFitClass = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit]

  return (
    <figure className={cn("relative", className)}>
      {/* Schema.org para la imagen */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(imageSchema),
          }}
        />
      )}

      <div
        className={cn(
          "relative overflow-hidden",
          fill ? "w-full h-full" : "",
          !loaded && !error && "bg-[#252525] animate-pulse",
        )}
      >
        <Image
          src={error ? "/placeholder.svg" : src}
          alt={safeAlt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          priority={priority}
          fill={fill}
          sizes={sizes || (fill ? "100vw" : undefined)}
          loading={loading}
          quality={quality}
          className={cn(
            objectFitClass,
            "transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          blurDataURL={blurDataURL}
          placeholder={placeholder}
        />
      </div>

      {/* Caption y atribución */}
      {(caption || attribution) && (
        <figcaption className="mt-2 text-xs text-[#7A7A7A] text-center">
          {caption && <span>{caption}</span>}
          {caption && attribution && <span> - </span>}
          {attribution && <span>Crédito: {attribution}</span>}
        </figcaption>
      )}
    </figure>
  )
}
