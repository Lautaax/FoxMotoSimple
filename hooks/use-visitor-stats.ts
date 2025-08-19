"use client"

import { useState, useEffect } from "react"

interface VisitorStats {
  totalVisitors: number
  todayVisitors: number
  onlineVisitors: number
}

export function useVisitorStats() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Register this visitor
        await fetch("/api/visitors/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
          }),
        })

        // Fetch current stats
        const response = await fetch("/api/visitors/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          // Fallback to mock data if API fails
          setStats({
            totalVisitors: 15847,
            todayVisitors: 234,
            onlineVisitors: 12,
          })
        }
      } catch (error) {
        console.error("Error fetching visitor stats:", error)
        // Fallback to mock data
        setStats({
          totalVisitors: 15847,
          todayVisitors: 234,
          onlineVisitors: 12,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Set up periodic ping to maintain online status
    const pingInterval = setInterval(() => {
      fetch("/api/visitors/ping", { method: "POST" }).catch(() => {
        // Ignore ping errors
      })
    }, 30000) // Ping every 30 seconds

    return () => clearInterval(pingInterval)
  }, [])

  return { stats, isLoading }
}
