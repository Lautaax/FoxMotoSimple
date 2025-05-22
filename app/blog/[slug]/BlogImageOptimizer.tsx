"use client"

import { useEffect } from "react"
import { BlogFeaturedImage } from "@/components/blog-featured-image"
import { BlogImageGallery } from "@/components/blog-image-gallery"
import { generateOpenGraphImages, generateTwitterImages } from "@/lib/social-image-utils"

interface BlogImageOptimizerProps {
  post: {
    title: string
    slug: string
    coverImage: string
    category?: string
    content?: string
  }
  galleryImages?: Array<{
    src: string
    alt: string
    caption?: string
    attribution?: string
  }>
}

export function BlogImageOptimizer({ post, galleryImages = [] }: BlogImageOptimizerProps) {
  // Generar metadatos para Open Graph y Twitter
  const ogImages = generateOpenGraphImages({
    title: post.title,
    imagePath: post.coverImage,
    alt: `${post.title} | Fox Motorepuestos Blog`,
  })

  const twitterImages = generateTwitterImages({
    imagePath: post.coverImage,
  })

  // Añadir metadatos dinámicamente (esto es solo para demostración)
  useEffect(() => {
    // En un entorno real, estos metadatos se añadirían en el servidor
    console.log("Open Graph Images:", ogImages)
    console.log("Twitter Images:", twitterImages)
  }, [ogImages, twitterImages])

  return (
    <div>
      {/* Imagen destacada optimizada */}
      <BlogFeaturedImage
        src={post.coverImage}
        alt={post.title}
        title={post.title}
        category={post.category}
        className="mb-8"
      />

      {/* Galería de imágenes (si hay imágenes adicionales) */}
      {galleryImages.length > 0 && (
        <BlogImageGallery images={galleryImages} columns={2} gap="medium" className="my-8" />
      )}
    </div>
  )
}
