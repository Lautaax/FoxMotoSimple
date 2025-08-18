"use client"

import { useState, useEffect } from "react"
import { getAnalyticsData, type AnalyticsOverview } from "@/lib/analytics-service"

export interface AnalyticsState {
  data: AnalyticsOverview | null
  isLoading: boolean
  error: string | null
}

export function useAnalytics() {
  const [state, setState] = useState<AnalyticsState>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAnalyticsData()
        setState({
          data,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setState({
          data: null,
          isLoading: false,
          error: "Error al obtener datos de análisis",
        })
      }
    }

    fetchData()
  }, [])

  return state
}
