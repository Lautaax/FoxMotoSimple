"use client"

import { useState, useEffect } from "react"
import { useVisitorStats } from "@/hooks/use-visitor-stats"
import { Eye } from "lucide-react"

export function VisitorCounter() {
  const [displayCount, setDisplayCount] = useState(0)
  const { stats, isLoading } = useVisitorStats()

  useEffect(() => {
    if (stats?.totalVisitors) {
      // Animate counter
      const target = stats.totalVisitors
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setDisplayCount(target)
          clearInterval(timer)
        } else {
          setDisplayCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [stats?.totalVisitors])

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2 animate-pulse">---</div>
        <div className="text-[#7A7A7A]">Visitantes</div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Eye className="h-5 w-5 text-[#D32F2F]" />
        <div className="text-3xl md:text-4xl font-bold text-[#D32F2F]">{displayCount.toLocaleString()}</div>
      </div>
      <div className="text-[#7A7A7A]">Visitantes</div>
    </div>
  )
}
