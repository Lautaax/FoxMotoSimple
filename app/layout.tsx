import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getBaseUrl } from "@/lib/utils"
import { generateLocalBusinessSchema } from "@/lib/schema"

const inter = Inter({ subsets: ["latin"] })

// Asegurarse de que la URL base tenga el protocolo correcto
const baseUrl = getBaseUrl()

// Generar el schema para SEO local
const localBusinessSchema = generateLocalBusinessSchema()

export const metadata: Metadata = {
  title: "Fox Motorepuestos - Repuestos para Motos en Bahía Blanca",
  description:
    "Tienda especializada en repuestos y accesorios para motos en Bahía Blanca. Vendemos marcas como Far, The Orange, Osaca, DID, Choho, Metzeler, Motul, Wander y más.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  keywords:
    "repuestos de motos, accesorios para motos, cadenas de moto, aceites para motos, Bahía Blanca, Fox Motorepuestos",
  openGraph: {
    title: "Fox Motorepuestos - Repuestos para Motos en Bahía Blanca",
    description: "Tienda especializada en repuestos y accesorios para motos en Bahía Blanca.",
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
    description: "Tienda especializada en repuestos y accesorios para motos en Bahía Blanca.",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verificacion-google", // Reemplazar con el código de verificación real
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
