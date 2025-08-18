"use client"

import { useState, useEffect } from "react"

interface VisitorStats {
  uniqueVisitors: number
  totalPageViews: number
  averageSessionDuration: number
  bounceRate: number
}

export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)

        // Register current visitor
        await fetch("/api/visitors/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: Date.now(),
          }),
        })

        // Fetch current stats
        const response = await fetch("/api/visitors/stats")
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        // Fallback to mock data if API fails
        setStats({
          uniqueVisitors: 1247,
          totalPageViews: 3891,
          averageSessionDuration: 180,
          bounceRate: 0.35,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Ping every 30 seconds to update session duration
    const pingInterval = setInterval(() => {
      fetch("/api/visitors/ping", { method: "POST" }).catch(() => {
        // Ignore ping errors
      })
    }, 30000)

    return () => clearInterval(pingInterval)
  }, [])

  return { stats, isLoading, error }
}
