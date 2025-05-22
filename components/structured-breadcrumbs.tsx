"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateBreadcrumbSchema } from "@/lib/schema"
import { getCanonicalUrl } from "@/lib/url-utils"

interface StructuredBreadcrumbsProps {
  className?: string
  homeLabel?: string
  items?: Array<{
    label: string
    href: string
  }>
  currentPageLabel?: string
}

export function StructuredBreadcrumbs({
  className,
  homeLabel = "Inicio",
  items = [],
  currentPageLabel,
}: StructuredBreadcrumbsProps) {
  const pathname = usePathname()
  const baseUrl = getCanonicalUrl()

  // Generar breadcrumbs automáticamente si no se proporcionan
  const breadcrumbItems = items.length
    ? items
    : pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, segments) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const label = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
          return { label, href }
        })

  // Preparar los items para el schema.org
  const schemaItems = [
    { name: homeLabel, url: baseUrl },
    ...breadcrumbItems.map((item) => ({
      name: item.label,
      url: `${baseUrl}${item.href}`,
    })),
  ]

  if (currentPageLabel) {
    schemaItems.push({
      name: currentPageLabel,
      url: `${baseUrl}${pathname}`,
    })
  }

  // Generar el schema.org para breadcrumbs
  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems)

  return (
    <>
      {/* Schema.org para breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumbs visuales */}
      <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm", className)}>
        <ol className="flex items-center flex-wrap">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors flex items-center"
              aria-label="Inicio"
            >
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-[#7A7A7A]" />
          </li>

          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link href={item.href} className="text-[#7A7A7A] hover:text-[#D32F2F] transition-colors">
                {item.label}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 text-[#7A7A7A]" />
            </li>
          ))}

          {currentPageLabel && <li className="text-white font-medium">{currentPageLabel}</li>}
        </ol>
      </nav>
    </>
  )
}
