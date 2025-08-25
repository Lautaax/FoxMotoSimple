export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Fox Motorepuestos",
    image: "https://foxmotorepuestos.com/fox-logo.png",
    description: "Especialistas en repuestos y accesorios para motos en Bahía Blanca. Ventas mayoristas y minoristas.",
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
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

export function generateArticleSchema(article: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author || "Fox Motorepuestos",
    },
    publisher: {
      "@type": "Organization",
      name: "Fox Motorepuestos",
      logo: {
        "@type": "ImageObject",
        url: "https://foxmotorepuestos.com/fox-logo.png",
      },
    },
    image: article.image || "https://foxmotorepuestos.com/og-image.png",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  }
}

export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  brand: string
  price?: number
  availability?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability: product.availability || "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Fox Motorepuestos",
      },
    },
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
