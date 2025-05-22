import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getCanonicalUrl } from "@/lib/url-utils"
import { generateLocalBusinessSchema } from "@/lib/schema"

const inter = Inter({ subsets: ["latin"] })

// Asegurarse de que la URL base tenga el protocolo correcto
const baseUrl = getCanonicalUrl()

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
    "repuestos de motos, accesorios para motos, cadenas de moto, aceites para motos, Bahía Blanca, Fox Motorepuestos, repuestos originales, accesorios para motocicletas, tienda de repuestos",
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
        alt: "Fox Motorepuestos - Tienda de repuestos para motos en Bahía Blanca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fox Motorepuestos - Repuestos para Motos en Bahía Blanca",
    description: "Tienda especializada en repuestos y accesorios para motos en Bahía Blanca.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@foxmotorep",
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
    yandex: "verificacion-yandex", // Opcional
    bing: "verificacion-bing", // Opcional
  },
  authors: [{ name: "Fox Motorepuestos", url: baseUrl }],
  category: "Repuestos para Motos",
  applicationName: "Fox Motorepuestos",
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Bahía Blanca",
    "geo.position": "-38.7;-62.2",
    ICBM: "-38.7, -62.2",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#D32F2F" />
        <meta name="theme-color" content="#1C1C1C" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
