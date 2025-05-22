"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProgressiveImageProps {
  src: string
  lowResSrc: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export function ProgressiveImage({
  src,
  lowResSrc,
  alt,
  width,
  height,
  className,
  fill = false,
  sizes,
  priority = false,
  objectFit = "cover",
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = useState(lowResSrc || src)
  const [loading, setLoading] = useState(!priority)

  useEffect(() => {
    // Si ya tenemos la imagen de alta resolución o es prioritaria, no hacemos nada
    if (imgSrc === src || priority) return

    // Precargamos la imagen de alta resolución
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
      setLoading(false)
    }
  }, [src, imgSrc, priority])

  // Determinar el estilo de object-fit
  const objectFitClass = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit]

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn(
          objectFitClass,
          "transition-all duration-500",
          loading ? "scale-105 blur-sm" : "scale-100 blur-0",
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
