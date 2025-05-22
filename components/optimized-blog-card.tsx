"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SEOImage } from "@/components/seo-image"
import { generateImageMetadata } from "@/lib/image-utils"

interface OptimizedBlogCardProps {
  title: string
  excerpt: string
  slug: string
  coverImage: string
  date: string
  readTime: string
  category: string
  className?: string
  featured?: boolean
}

export function OptimizedBlogCard({
  title,
  excerpt,
  slug,
  coverImage,
  date,
  readTime,
  category,
  className,
  featured = false,
}: OptimizedBlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generar metadatos optimizados para la imagen
  const metadata = generateImageMetadata({
    title,
    context: title,
    category: "thumbnail",
  })

  return (
    <Card
      className={cn(
        "overflow-hidden border-[#7A7A7A]/20 bg-[#1C1C1C] transition-all duration-300 hover:border-[#D32F2F]/50",
        featured ? "lg:col-span-2" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="relative aspect-video overflow-hidden">
          <SEOImage
            src={coverImage}
            alt={`${title} | Fox Motorepuestos Blog`}
            fill
            className={cn("transition-transform duration-500", isHovered ? "scale-105" : "scale-100")}
            priority={featured}
            sizes={
              featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            }
            quality={featured ? 85 : 75}
          />
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-[#D32F2F] px-3 py-1 text-xs font-medium text-white">
          {category}
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-4 text-xs text-[#7A7A7A]">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className="mb-3 text-xl font-bold leading-tight">
          <Link href={`/blog/${slug}`} className="hover:text-[#D32F2F] transition-colors">
            {title}
          </Link>
        </h3>

        <p className="mb-4 text-[#7A7A7A]">{excerpt}</p>

        <div className="flex items-center justify-between">
          <Button asChild variant="link" className="p-0 text-[#D32F2F] hover:text-[#D32F2F]/80">
            <Link href={`/blog/${slug}`}>Leer más</Link>
          </Button>

          <button
            className="rounded-full p-2 text-[#7A7A7A] hover:bg-[#252525] hover:text-white transition-colors"
            aria-label="Compartir"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
