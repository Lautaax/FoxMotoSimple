import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CookieConsent } from "@/components/cookie-consent"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fox Motorepuestos - Repuestos de Motos en Bahía Blanca | Ventas Mayoristas y Minoristas",
  description:
    "Especialistas en repuestos de motos en Bahía Blanca. Ventas mayoristas y minoristas. Trabajamos con las mejores marcas: FAR, DID, Metzeler, Motul y más. Servicio técnico especializado.",
  keywords:
    "repuestos motos, Bahía Blanca, Fox Motorepuestos, cadenas, neumáticos, aceites, accesorios, ventas mayoristas, distribuidores, talleres, FAR, DID, Metzeler, Motul",
  authors: [{ name: "Fox Motorepuestos" }],
  creator: "Fox Motorepuestos",
  publisher: "Fox Motorepuestos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://foxmotorepuestos.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fox Motorepuestos - Repuestos de Motos en Bahía Blanca | Ventas Mayoristas",
    description:
      "Especialistas en repuestos de motos. Ventas mayoristas y minoristas. Las mejores marcas en Bahía Blanca.",
    url: "https://foxmotorepuestos.com",
    siteName: "Fox Motorepuestos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fox Motorepuestos - Repuestos de Motos",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fox Motorepuestos - Repuestos de Motos en Bahía Blanca",
    description: "Especialistas en repuestos de motos. Ventas mayoristas y minoristas.",
    images: ["/og-image.png"],
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
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#D32F2F" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Fox Motorepuestos",
              image: "https://foxmotorepuestos.com/fox-logo.png",
              description:
                "Especialistas en repuestos y accesorios para motos en Bahía Blanca. Ventas mayoristas y minoristas.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Manzana de las Luces 475",
                addressLocality: "Bahía Blanca",
                addressRegion: "Buenos Aires",
                postalCode: "8000",
                addressCountry: "AR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -38.6976364,
                longitude: -62.3089406,
              },
              url: "https://foxmotorepuestos.com",
              telephone: "+542915221351",
              email: "foxmotorepuestos@gmail.com",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              sameAs: ["https://instagram.com/foxmotorep", "https://facebook.com/foxmotorepuestosbb"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Repuestos para Motos",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Cadenas para Motos",
                      category: "Repuestos",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Neumáticos para Motos",
                      category: "Repuestos",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <Suspense fallback={null}>
            {children}
            <WhatsAppButton />
            <ScrollToTop />
            <CookieConsent />
          </Suspense>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
