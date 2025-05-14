"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FollowerCounterProps {
  count: number
  label?: string
  className?: string
  animated?: boolean
}

export function FollowerCounter({ count, label = "seguidores", className, animated = true }: FollowerCounterProps) {
  const [displayCount, setDisplayCount] = useState(0)

  // Formatear números grandes (ej: 1500 -> 1.5K)
  const formatCount = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
    }
    return num.toString()
  }

  // Animación de contador
  useEffect(() => {
    if (!animated) {
      setDisplayCount(count)
      return
    }

    // Si el contador es pequeño, incrementamos de uno en uno
    if (count < 100) {
      let current = 0
      const interval = setInterval(() => {
        current += 1
        setDisplayCount(current)
        if (current >= count) {
          clearInterval(interval)
        }
      }, 50)
      return () => clearInterval(interval)
    }
    // Para números grandes, animamos con incrementos proporcionales
    else {
      const duration = 1500 // duración de la animación en ms
      const steps = 20 // número de pasos
      const increment = count / steps
      let current = 0
      const interval = setInterval(() => {
        current += increment
        setDisplayCount(Math.min(Math.round(current), count))
        if (current >= count) {
          clearInterval(interval)
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }
  }, [count, animated])

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="text-xl font-bold">{formatCount(displayCount)}</span>
      <span className="text-xs text-[#7A7A7A]">{label}</span>
    </div>
  )
}
