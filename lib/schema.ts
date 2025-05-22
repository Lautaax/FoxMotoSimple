import { getCanonicalUrl, getAssetUrl } from "./url-utils"

// Schema.org estructurado para SEO local
export const generateLocalBusinessSchema = () => {
  const baseUrl = getCanonicalUrl()
  const logoUrl = getAssetUrl("/fox-logo.png")

  return {
    "@context": "https://schema.org",
    "@type": "MotorcycleRepair",
    name: "Fox Motorepuestos",
    image: logoUrl,
    logo: logoUrl,
    "@id": `${baseUrl}/#organization`,
    url: baseUrl,
    telephone: "+542915347003",
    email: "info@foxmotorepuestos.com",
    priceRange: "$$",
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
      latitude: -38.7,
      longitude: -62.2,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: ["https://www.facebook.com/foxmotorepuestosbb", "https://www.instagram.com/foxmotorep"],
    description:
      "Tienda especializada en repuestos y accesorios para motos en Bahía Blanca. Vendemos marcas como Far, The Orange, Osaca, DID, Choho, Metzeler, Motul, Wander y más.",
    keywords:
      "repuestos de motos, accesorios para motos, cadenas de moto, aceites para motos, Bahía Blanca, Fox Motorepuestos",
    areaServed: [
      {
        "@type": "City",
        name: "Bahía Blanca",
        "@id": "https://www.geonames.org/3865086/bahia-blanca.html",
      },
      {
        "@type": "City",
        name: "Punta Alta",
        "@id": "https://www.geonames.org/3429576/punta-alta.html",
      },
      {
        "@type": "City",
        name: "Ingeniero White",
        "@id": "https://www.geonames.org/3433663/ingeniero-white.html",
      },
      {
        "@type": "City",
        name: "General Daniel Cerri",
      },
      {
        "@type": "City",
        name: "Villa Bordeu",
      },
      {
        "@type": "City",
        name: "Cabildo",
      },
    ],
    hasMap: "https://www.google.com/maps?cid=your-google-my-business-id",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/contacto`,
          inLanguage: "es",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform",
          ],
        },
        result: {
          "@type": "Order",
          provider: {
            "@type": "Organization",
            name: "Fox Motorepuestos",
          },
        },
      },
    ],
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Carlos Rodríguez",
        },
        datePublished: "2023-08-15",
        reviewBody:
          "Excelente atención y variedad de repuestos. Encontré todo lo que necesitaba para mi Honda. Precios justos y buena calidad.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Laura Martínez",
        },
        datePublished: "2023-09-20",
        reviewBody: "Muy buena atención, tienen casi todo lo que se necesita. El personal es muy amable y conocedor.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  }
}

// Schema.org para breadcrumbs
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Schema.org para FAQs
export const generateFAQSchema = (questions: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

// Schema.org para productos
export const generateProductSchema = (product: {
  name: string
  description: string
  image: string
  sku: string
  brand: string
  price: number
  priceCurrency?: string
  availability?: string
  url?: string
}) => {
  const baseUrl = getCanonicalUrl()
  const productUrl = product.url || `${baseUrl}/productos/${product.sku}`

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.priceCurrency || "ARS",
      availability: product.availability || "https://schema.org/InStock",
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: "Fox Motorepuestos",
      },
    },
  }
}

// Schema.org para artículos de blog
export const generateArticleSchema = (article: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName: string
  publisherName?: string
  publisherLogo?: string
}) => {
  const baseUrl = getCanonicalUrl()
  const logoUrl = article.publisherLogo || getAssetUrl("/fox-logo.png")

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: article.publisherName || "Fox Motorepuestos",
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.headline.toLowerCase().replace(/\s+/g, "-")}`,
    },
  }
}

// Schema.org para la página de contacto
export const generateContactPageSchema = () => {
  const baseUrl = getCanonicalUrl()

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto - Fox Motorepuestos",
    description: "Contacta con Fox Motorepuestos para consultas sobre repuestos y accesorios para motos.",
    url: `${baseUrl}/contacto`,
    mainEntity: {
      "@type": "Organization",
      name: "Fox Motorepuestos",
      telephone: "+542915347003",
      email: "info@foxmotorepuestos.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Manzana de las Luces 475",
        addressLocality: "Bahía Blanca",
        addressRegion: "Buenos Aires",
        postalCode: "8000",
        addressCountry: "AR",
      },
    },
  }
}
