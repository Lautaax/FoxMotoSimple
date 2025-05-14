// Schema.org estructurado para SEO local
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "MotorcycleRepair",
    name: "Fox Motorepuestos",
    image: "https://www.foxmotorepuestos.com/fox-logo.png",
    logo: "https://www.foxmotorepuestos.com/fox-logo.png",
    "@id": "https://www.foxmotorepuestos.com",
    url: "https://www.foxmotorepuestos.com",
    telephone: "+542915347003",
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
      "Tienda especializada en repuestos y accesorios para motos. Vendemos marcas como Far, The Orange, Osaca, DID, Choho, Metzeler, Motul, Wander y más.",
    keywords:
      "repuestos de motos, accesorios para motos, cadenas de moto, aceites para motos, Bahía Blanca, Fox Motorepuestos",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -38.7,
        longitude: -62.2,
      },
      geoRadius: "50000",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.foxmotorepuestos.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}
