"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (path: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Track custom events
    if (typeof window !== "undefined") {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag("event", eventName, properties)
      }

      // Custom analytics
      fetch("/api/visitors/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          properties,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Ignore tracking errors
      })
    }
  }

  const trackPageView = (path: string) => {
    if (typeof window !== "undefined") {
      // Google Analytics 4
      if (window.gtag) {
        window.gtag("config", "GA_MEASUREMENT_ID", {
          page_path: path,
        })
      }
    }
  }

  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname)
  }, [])

  return <AnalyticsContext.Provider value={{ trackEvent, trackPageView }}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
