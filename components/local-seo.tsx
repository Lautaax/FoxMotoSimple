"use client"

import { useEffect } from "react"
import { LocalSEOFooter } from "./local-seo-footer"

export function LocalSEO() {
  // Este componente combina elementos de SEO local
  // y renderiza el footer de SEO local

  useEffect(() => {
    // Aquí podríamos agregar lógica adicional para SEO local si es necesario
    // Por ejemplo, tracking de eventos locales, etc.
  }, [])

  return (
    <>
      {/* Footer con enlaces a áreas locales para SEO */}
      <LocalSEOFooter />
    </>
  )
}
