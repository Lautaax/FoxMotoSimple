"use client"

import { SEOImage } from "@/components/seo-image"
import { generateImageMetadata } from "@/lib/image-utils"

interface BlogFeaturedImageProps {
  src: string
  alt: string
  title: string
  category?: string
  caption?: string
  attribution?: string
  className?: string
}

export function BlogFeaturedImage({
  src,
  alt,
  title,
  category,
  caption,
  attribution,
  className,
}: BlogFeaturedImageProps) {
  // Generar metadatos optimizados para la imagen destacada
  const metadata = generateImageMetadata({
    title,
    context: alt || title,
    category: "blog",
    isHero: true,
  })

  return (
    <div className={className}>
      <SEOImage
        src={src}
        alt={alt || metadata.alt}
        width={metadata.width}
        height={metadata.height}
        priority={true}
        quality={95}
        caption={caption}
        attribution={attribution}
        className="aspect-video w-full rounded-lg"
        articleContext={true}
      />
    </div>
  )
}
