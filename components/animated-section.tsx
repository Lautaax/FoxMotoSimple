"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  animation?: "fade-up" | "fade-in" | "slide-in-right" | "slide-in-left" | "zoom-in"
  delay?: number
}

export function AnimatedSection({
  children,
  className,
  threshold = 0.1,
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Configurar las clases de animación según el tipo
  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-700"
    const delayClass = delay ? `delay-${delay}` : ""

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-10`
        case "fade-in":
          return `${baseClasses} opacity-0`
        case "slide-in-right":
          return `${baseClasses} opacity-0 translate-x-10`
        case "slide-in-left":
          return `${baseClasses} opacity-0 -translate-x-10`
        case "zoom-in":
          return `${baseClasses} opacity-0 scale-95`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px", // Activar un poco antes de que el elemento sea visible
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  return (
    <div ref={ref} className={cn(getAnimationClasses(), className)}>
      {children}
    </div>
  )
}
