"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn"
}

export function AnimatedSection({ children, className, delay = 0, animation = "fadeInUp" }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getAnimationClass = () => {
    switch (animation) {
      case "fadeInLeft":
        return isVisible ? "animate-fade-in-left" : "opacity-0 -translate-x-8"
      case "fadeInRight":
        return isVisible ? "animate-fade-in-right" : "opacity-0 translate-x-8"
      case "fadeIn":
        return isVisible ? "animate-fade-in" : "opacity-0"
      default:
        return isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
    }
  }

  return (
    <div ref={ref} className={cn("transition-all duration-700 ease-out", getAnimationClass(), className)}>
      {children}
    </div>
  )
}
