"use client"

import { cn } from "@/lib/utils"

import { SEOImage } from "@/components/seo-image"
import { generateImageMetadata } from "@/lib/image-utils"

interface BlogContentImageProps {
  src: string
  alt: string
  align?: "left" | "center" | "right"
  width?: number
  height?: number
  caption?: string
  attribution?: string
  className?: string
}

export function BlogContentImage({
  src,
  alt,
  align = "center",
  width,
  height,
  caption,
  attribution,
  className,
}: BlogContentImageProps) {
  // Generar metadatos optimizados para la imagen
  const metadata = generateImageMetadata({
    title: alt,
    context: alt,
    category: "blog",
  })

  // Configurar clases según la alineación
  const alignmentClasses = {
    left: "float-left mr-6 mb-4",
    center: "mx-auto my-6",
    right: "float-right ml-6 mb-4",
  }

  return (
    <div className={cn(alignmentClasses[align], className)}>
      <SEOImage
        src={src}
        alt={alt}
        width={width || metadata.width}
        height={height || metadata.height}
        caption={caption}
        attribution={attribution}
        className="rounded-lg"
        articleContext={true}
      />
    </div>
  )
}
