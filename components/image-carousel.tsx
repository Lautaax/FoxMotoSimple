"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  autoplaySpeed?: number
  className?: string
}

export function ImageCarousel({ images, autoplaySpeed = 5000, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Función para ir a la siguiente imagen
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  // Función para ir a la imagen anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  // Función para ir a una imagen específica
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Pausar autoplay cuando el usuario interactúa con los controles
  const handleInteraction = () => {
    setIsAutoPlaying(false)
    // Reanudar autoplay después de 10 segundos de inactividad
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Efecto para el autoplay
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoplaySpeed)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, autoplaySpeed])

  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-lg", className)}>
      {/* Imágenes */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 h-full w-full transition-opacity duration-1000",
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Overlay para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Controles de navegación */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
        onClick={() => {
          prevSlide()
          handleInteraction()
        }}
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 transition-colors"
        onClick={() => {
          nextSlide()
          handleInteraction()
        }}
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-4" : "bg-white/50",
            )}
            onClick={() => {
              goToSlide(index)
              handleInteraction()
            }}
            aria-label={`Ir a imagen ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
