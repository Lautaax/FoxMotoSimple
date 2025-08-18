"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"
import { useVisitorStats } from "@/hooks/use-visitor-stats"

export function VisitorCounter() {
  const [displayCount, setDisplayCount] = useState(0)
  const { stats, isLoading } = useVisitorStats()

  useEffect(() => {
    if (stats?.uniqueVisitors) {
      // Animate counter
      const targetCount = stats.uniqueVisitors
      const duration = 2000 // 2 seconds
      const steps = 60
      const increment = targetCount / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= targetCount) {
          setDisplayCount(targetCount)
          clearInterval(timer)
        } else {
          setDisplayCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [stats?.uniqueVisitors])

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2">
          <div className="animate-pulse bg-[#D32F2F]/20 h-10 w-16 mx-auto rounded"></div>
        </div>
        <div className="text-[#7A7A7A]">Visitantes únicos</div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#D32F2F] mb-2 flex items-center justify-center gap-2">
        <Eye className="h-6 w-6" />
        {displayCount.toLocaleString()}
      </div>
      <div className="text-[#7A7A7A]">Visitantes únicos</div>
    </div>
  )
}
