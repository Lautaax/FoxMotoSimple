"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  name: string
  role?: string
  content: string
  rating: number
  image?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  autoplaySpeed?: number
  className?: string
}

export function TestimonialsCarousel({ testimonials, autoplaySpeed = 5000, className }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Función para ir al siguiente testimonio
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  // Función para ir al testimonio anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  // Función para ir a un testimonio específico
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

  // Renderizar estrellas según la calificación
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("h-4 w-4 mr-0.5", star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400")}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="bg-[#1C1C1C] border-[#7A7A7A]/20 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">{renderStars(testimonial.rating)}</div>
                  <div className="relative flex-1">
                    <Quote className="absolute top-0 left-0 h-8 w-8 text-[#D32F2F]/20 -translate-x-2 -translate-y-2" />
                    <p className="text-[#E0E0E0] italic relative z-10 mb-6">{testimonial.content}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    {testimonial.image && (
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#D32F2F]/10 mr-3">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      {testimonial.role && <p className="text-sm text-[#7A7A7A]">{testimonial.role}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#1C1C1C] p-2 text-white hover:bg-[#D32F2F] transition-colors shadow-lg z-10"
        onClick={() => {
          prevSlide()
          handleInteraction()
        }}
        aria-label="Testimonio anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#1C1C1C] p-2 text-white hover:bg-[#D32F2F] transition-colors shadow-lg z-10"
        onClick={() => {
          nextSlide()
          handleInteraction()
        }}
        aria-label="Siguiente testimonio"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-[#D32F2F] w-4" : "bg-[#7A7A7A]/50",
            )}
            onClick={() => {
              goToSlide(index)
              handleInteraction()
            }}
            aria-label={`Ir a testimonio ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
