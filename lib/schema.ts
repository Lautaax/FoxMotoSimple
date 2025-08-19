export interface LocalBusiness {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  telephone: string
  email?: string
  url: string
  openingHours: string[]
  priceRange: string
  image?: string
  logo?: string
  geo?: {
    latitude: number
    longitude: number
  }
}

export interface Product {
  name: string
  description: string
  image?: string
  brand?: string
  category: string
  offers?: {
    price?: number
    currency?: string
    availability?: string
  }
}

export interface Article {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function generateLocalBusinessSchema(business: LocalBusiness) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    telephone: business.telephone,
    email: business.email,
    url: business.url,
    openingHours: business.openingHours,
    priceRange: business.priceRange,
    image: business.image,
    logo: business.logo,
    geo: business.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        }
      : undefined,
  }
}

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    category: product.category,
    offers: product.offers
      ? {
          "@type": "Offer",
          price: product.offers.price,
          priceCurrency: product.offers.currency || "ARS",
          availability: product.offers.availability || "https://schema.org/InStock",
        }
      : undefined,
  }
}

export function generateArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: article.image,
    url: article.url,
    publisher: {
      "@type": "Organization",
      name: "Fox MotoRespuestos",
      logo: {
        "@type": "ImageObject",
        url: "/fox-logo.png",
      },
    },
  }
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
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

export function generateWebsiteSchema(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: name,
    url: url,
    description: description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generateOrganizationSchema(business: LocalBusiness) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    description: business.description,
    url: business.url,
    logo: business.logo,
    image: business.image,
    telephone: business.telephone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: business.geo
      ? {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        }
      : undefined,
    sameAs: ["https://www.facebook.com/foxmotorespuestos", "https://www.instagram.com/foxmotorespuestos"],
  }
}
