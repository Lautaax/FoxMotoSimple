import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getBaseUrl } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

// Asegurarse de que la URL base tenga el protocolo correcto
const baseUrl = getBaseUrl()

export const metadata: Metadata = {
  title: "Fox Motorepuestos - Repuestos para Motos en Bahía Blanca",
  description:
    "Tienda especializada en repuestos y accesorios para motos. Vendemos marcas como Far, The Orange, Osaca, DID, Choho, Metzeler, Motul, Wander y más.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fox Motorepuestos - Repuestos para Motos en Bahía Blanca",
    description: "Tienda especializada en repuestos y accesorios para motos.",
    url: baseUrl,
    siteName: "Fox Motorepuestos",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Fox Motorepuestos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fox Motorepuestos - Repuestos para Motos en Bahía Blanca",
    description: "Tienda especializada en repuestos y accesorios para motos.",
    images: [`${baseUrl}/og-image.png`],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
