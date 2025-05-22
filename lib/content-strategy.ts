// Estrategia de contenido para SEO de Fox Motorepuestos

// Palabras clave principales por categoría
export const keywordsByCategory = {
  general: [
    "repuestos de motos bahía blanca",
    "accesorios para motos bahía blanca",
    "tienda de repuestos de motos",
    "fox motorepuestos",
    "repuestos originales motos",
  ],
  productos: [
    "cadenas para motos",
    "aceite para motos 4t",
    "neumáticos para motos",
    "baterías para motos",
    "frenos para motos",
    "filtros de aceite moto",
    "kit de transmisión moto",
    "escapes para motos",
  ],
  marcas: [
    "repuestos honda bahía blanca",
    "repuestos yamaha bahía blanca",
    "repuestos suzuki bahía blanca",
    "repuestos kawasaki bahía blanca",
    "repuestos bajaj bahía blanca",
    "repuestos motomel bahía blanca",
    "repuestos zanella bahía blanca",
    "repuestos corven bahía blanca",
  ],
  mantenimiento: [
    "cambio de aceite moto",
    "mantenimiento cadena moto",
    "cambio de neumáticos moto",
    "mantenimiento frenos moto",
    "afinación de motos",
    "cambio de filtros moto",
    "mantenimiento preventivo motos",
    "reparación de motos",
  ],
  consejos: [
    "consejos para comprar repuestos de moto",
    "cómo elegir neumáticos para moto",
    "mejores aceites para motos",
    "cómo aumentar la vida útil de tu moto",
    "consejos para motos en invierno",
    "preparar moto para viaje largo",
    "cuidados básicos para tu moto",
    "qué revisar antes de comprar una moto usada",
  ],
  local: [
    "repuestos de motos punta alta",
    "repuestos de motos ingeniero white",
    "repuestos de motos general daniel cerri",
    "repuestos de motos villa bordeu",
    "repuestos de motos cabildo",
    "repuestos de motos villa espora",
    "repuestos de motos villa harding green",
  ],
}

// Tipos de contenido recomendados
export const contentTypes = [
  {
    type: "Guías de compra",
    description: "Artículos detallados sobre cómo elegir diferentes tipos de repuestos",
    examples: [
      "Guía completa para elegir la cadena perfecta para tu moto",
      "Cómo elegir el aceite correcto según el tipo de moto",
      "Todo lo que debes saber antes de comprar neumáticos para tu moto",
    ],
    frequency: "Mensual",
    wordCount: "1200-1500 palabras",
  },
  {
    type: "Tutoriales de mantenimiento",
    description: "Instrucciones paso a paso para el mantenimiento básico de motos",
    examples: [
      "Cómo cambiar el aceite de tu moto en 10 pasos sencillos",
      "Guía paso a paso para tensar y lubricar la cadena de tu moto",
      "Mantenimiento de frenos: todo lo que necesitas saber",
    ],
    frequency: "Quincenal",
    wordCount: "800-1200 palabras",
  },
  {
    type: "Comparativas de productos",
    description: "Análisis comparativos entre diferentes marcas o modelos de repuestos",
    examples: [
      "Cadenas DID vs. Choho: ¿Cuál es mejor para tu moto?",
      "Comparativa: Los 5 mejores aceites para motos 4T del mercado",
      "Neumáticos Metzeler vs. Pirelli: Pros y contras para cada tipo de moto",
    ],
    frequency: "Mensual",
    wordCount: "1000-1500 palabras",
  },
  {
    type: "Noticias del sector",
    description: "Novedades sobre el mundo de las motos y los repuestos",
    examples: [
      "Nuevos modelos de motos 2023: repuestos compatibles disponibles",
      "Cambios en la normativa de emisiones: cómo afecta a tu moto",
      "Tendencias en accesorios para motos esta temporada",
    ],
    frequency: "Semanal",
    wordCount: "500-800 palabras",
  },
  {
    type: "Preguntas frecuentes",
    description: "Respuestas a las dudas más comunes de los clientes",
    examples: [
      "¿Cada cuánto debo cambiar el aceite de mi moto?",
      "¿Cómo saber si necesito cambiar la cadena de mi moto?",
      "¿Puedo usar repuestos alternativos en mi moto con garantía?",
    ],
    frequency: "Semanal",
    wordCount: "300-500 palabras",
  },
  {
    type: "Historias de clientes",
    description: "Casos de éxito y experiencias de clientes con los productos",
    examples: [
      "De Bahía Blanca a Ushuaia: Juan preparó su moto con nuestros repuestos",
      "Cómo María recuperó el rendimiento de su moto antigua con repuestos de calidad",
      "Testimonios: Mecánicos profesionales que confían en Fox Motorepuestos",
    ],
    frequency: "Mensual",
    wordCount: "600-800 palabras",
  },
  {
    type: "Contenido local",
    description: "Artículos enfocados en la comunidad local de motociclistas",
    examples: [
      "Las 5 mejores rutas para motos cerca de Bahía Blanca",
      "Eventos para motociclistas en Bahía Blanca y alrededores",
      "Comunidad motera: Grupos y clubes de motos en la zona",
    ],
    frequency: "Mensual",
    wordCount: "800-1000 palabras",
  },
  {
    type: "Infografías",
    description: "Contenido visual explicativo sobre temas relacionados con motos",
    examples: [
      "Anatomía de una moto: Nombres de todas las piezas",
      "Calendario de mantenimiento según kilometraje",
      "Guía visual: Cómo identificar problemas comunes en tu moto",
    ],
    frequency: "Bimestral",
    wordCount: "300-500 palabras + gráfico",
  },
]

// Calendario editorial trimestral
export const editorialCalendar = [
  {
    month: "Mes 1",
    weeks: [
      {
        week: "Semana 1",
        content: [
          {
            title: "Guía completa para elegir la cadena perfecta para tu moto",
            type: "Guía de compra",
            keywords: ["cadenas para motos", "kit de transmisión moto", "repuestos de motos bahía blanca"],
            status: "Por planificar",
          },
          {
            title: "¿Cada cuánto debo cambiar el aceite de mi moto?",
            type: "Preguntas frecuentes",
            keywords: ["cambio de aceite moto", "mantenimiento preventivo motos", "aceite para motos 4t"],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 2",
        content: [
          {
            title: "Cómo cambiar el aceite de tu moto en 10 pasos sencillos",
            type: "Tutorial de mantenimiento",
            keywords: ["cambio de aceite moto", "mantenimiento preventivo motos", "aceite para motos 4t"],
            status: "Por planificar",
          },
          {
            title: "Nuevos modelos de motos 2023: repuestos compatibles disponibles",
            type: "Noticias del sector",
            keywords: ["repuestos originales motos", "fox motorepuestos", "repuestos de motos bahía blanca"],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 3",
        content: [
          {
            title: "¿Cómo saber si necesito cambiar la cadena de mi moto?",
            type: "Preguntas frecuentes",
            keywords: ["cadenas para motos", "mantenimiento cadena moto", "kit de transmisión moto"],
            status: "Por planificar",
          },
          {
            title: "Las 5 mejores rutas para motos cerca de Bahía Blanca",
            type: "Contenido local",
            keywords: [
              "rutas para motos bahía blanca",
              "comunidad motera bahía blanca",
              "repuestos de motos bahía blanca",
            ],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 4",
        content: [
          {
            title: "Comparativa: Los 5 mejores aceites para motos 4T del mercado",
            type: "Comparativa de productos",
            keywords: ["aceite para motos 4t", "mejores aceites para motos", "mantenimiento preventivo motos"],
            status: "Por planificar",
          },
          {
            title: "¿Puedo usar repuestos alternativos en mi moto con garantía?",
            type: "Preguntas frecuentes",
            keywords: [
              "repuestos originales motos",
              "repuestos alternativos moto",
              "consejos para comprar repuestos de moto",
            ],
            status: "Por planificar",
          },
        ],
      },
    ],
  },
  {
    month: "Mes 2",
    weeks: [
      {
        week: "Semana 1",
        content: [
          {
            title: "Todo lo que debes saber antes de comprar neumáticos para tu moto",
            type: "Guía de compra",
            keywords: ["neumáticos para motos", "cómo elegir neumáticos para moto", "cambio de neumáticos moto"],
            status: "Por planificar",
          },
          {
            title: "Eventos para motociclistas en Bahía Blanca y alrededores",
            type: "Contenido local",
            keywords: [
              "eventos motos bahía blanca",
              "comunidad motera bahía blanca",
              "repuestos de motos bahía blanca",
            ],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 2",
        content: [
          {
            title: "Guía paso a paso para tensar y lubricar la cadena de tu moto",
            type: "Tutorial de mantenimiento",
            keywords: ["mantenimiento cadena moto", "cadenas para motos", "lubricación cadena moto"],
            status: "Por planificar",
          },
          {
            title: "Tendencias en accesorios para motos esta temporada",
            type: "Noticias del sector",
            keywords: ["accesorios para motos bahía blanca", "tendencias motos", "fox motorepuestos"],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 3",
        content: [
          {
            title: "Calendario de mantenimiento según kilometraje",
            type: "Infografía",
            keywords: [
              "mantenimiento preventivo motos",
              "calendario mantenimiento moto",
              "cuidados básicos para tu moto",
            ],
            status: "Por planificar",
          },
          {
            title: "¿Cómo preparar tu moto para el invierno?",
            type: "Preguntas frecuentes",
            keywords: [
              "consejos para motos en invierno",
              "mantenimiento preventivo motos",
              "cuidados básicos para tu moto",
            ],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 4",
        content: [
          {
            title: "De Bahía Blanca a Ushuaia: Juan preparó su moto con nuestros repuestos",
            type: "Historia de cliente",
            keywords: ["repuestos de motos bahía blanca", "fox motorepuestos", "preparar moto para viaje largo"],
            status: "Por planificar",
          },
          {
            title: "Neumáticos Metzeler vs. Pirelli: Pros y contras para cada tipo de moto",
            type: "Comparativa de productos",
            keywords: ["neumáticos para motos", "cómo elegir neumáticos para moto", "metzeler vs pirelli"],
            status: "Por planificar",
          },
        ],
      },
    ],
  },
  {
    month: "Mes 3",
    weeks: [
      {
        week: "Semana 1",
        content: [
          {
            title: "Cómo elegir el aceite correcto según el tipo de moto",
            type: "Guía de compra",
            keywords: ["aceite para motos 4t", "mejores aceites para motos", "cambio de aceite moto"],
            status: "Por planificar",
          },
          {
            title: "¿Qué revisar antes de comprar una moto usada?",
            type: "Preguntas frecuentes",
            keywords: ["comprar moto usada", "revisión moto usada", "consejos para comprar repuestos de moto"],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 2",
        content: [
          {
            title: "Mantenimiento de frenos: todo lo que necesitas saber",
            type: "Tutorial de mantenimiento",
            keywords: ["frenos para motos", "mantenimiento frenos moto", "repuestos de motos bahía blanca"],
            status: "Por planificar",
          },
          {
            title: "Cambios en la normativa de emisiones: cómo afecta a tu moto",
            type: "Noticias del sector",
            keywords: ["normativa emisiones motos", "mantenimiento preventivo motos", "filtros para motos"],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 3",
        content: [
          {
            title: "Comunidad motera: Grupos y clubes de motos en la zona",
            type: "Contenido local",
            keywords: [
              "clubes de motos bahía blanca",
              "comunidad motera bahía blanca",
              "repuestos de motos bahía blanca",
            ],
            status: "Por planificar",
          },
          {
            title: "¿Cómo aumentar la vida útil de tu moto?",
            type: "Preguntas frecuentes",
            keywords: ["aumentar vida útil moto", "mantenimiento preventivo motos", "cuidados básicos para tu moto"],
            status: "Por planificar",
          },
        ],
      },
      {
        week: "Semana 4",
        content: [
          {
            title: "Cadenas DID vs. Choho: ¿Cuál es mejor para tu moto?",
            type: "Comparativa de productos",
            keywords: ["cadenas para motos", "DID vs Choho", "kit de transmisión moto"],
            status: "Por planificar",
          },
          {
            title: "Guía visual: Cómo identificar problemas comunes en tu moto",
            type: "Infografía",
            keywords: ["problemas comunes motos", "diagnóstico moto", "mantenimiento preventivo motos"],
            status: "Por planificar",
          },
        ],
      },
    ],
  },
]

// Métricas para seguimiento de contenido
export const contentMetrics = [
  {
    name: "Tráfico orgánico",
    description: "Número de visitas que llegan desde motores de búsqueda",
    tool: "Google Analytics",
    frequency: "Semanal",
    goal: "Incremento del 10% mensual",
  },
  {
    name: "Posicionamiento de palabras clave",
    description: "Posición en los resultados de búsqueda para palabras clave objetivo",
    tool: "Google Search Console, SEMrush o Ahrefs",
    frequency: "Quincenal",
    goal: "Top 10 para palabras clave principales",
  },
  {
    name: "Tiempo de permanencia",
    description: "Tiempo promedio que los usuarios pasan leyendo el contenido",
    tool: "Google Analytics",
    frequency: "Semanal",
    goal: "Más de 2 minutos por página",
  },
  {
    name: "Tasa de rebote",
    description: "Porcentaje de usuarios que abandonan el sitio después de ver una sola página",
    tool: "Google Analytics",
    frequency: "Semanal",
    goal: "Menos del 60%",
  },
  {
    name: "Conversiones",
    description: "Acciones deseadas realizadas por los usuarios (contactos, visitas a la tienda)",
    tool: "Google Analytics, CRM",
    frequency: "Mensual",
    goal: "Incremento del 5% mensual",
  },
  {
    name: "Compartidos en redes sociales",
    description: "Número de veces que el contenido se comparte en redes sociales",
    tool: "Herramientas de redes sociales, AddThis",
    frequency: "Semanal",
    goal: "Mínimo 10 compartidos por artículo",
  },
  {
    name: "Backlinks generados",
    description: "Enlaces externos que apuntan al contenido",
    tool: "SEMrush, Ahrefs, Moz",
    frequency: "Mensual",
    goal: "2-3 backlinks de calidad por mes",
  },
  {
    name: "Comentarios y engagement",
    description: "Interacciones de los usuarios con el contenido",
    tool: "Sistema de comentarios, redes sociales",
    frequency: "Semanal",
    goal: "Mínimo 5 comentarios por artículo",
  },
]

// Estrategia de optimización on-page
export const onPageOptimization = {
  title: {
    description: "Título de la página (etiqueta title)",
    bestPractices: [
      "Incluir la palabra clave principal cerca del inicio",
      "Mantener entre 50-60 caracteres",
      "Hacer que sea atractivo para los usuarios",
      "Ser único para cada página",
    ],
    example: "Guía Completa: Cómo Elegir Cadenas para Motos | Fox Motorepuestos",
  },
  metaDescription: {
    description: "Descripción que aparece en los resultados de búsqueda",
    bestPractices: [
      "Incluir la palabra clave principal y secundarias",
      "Mantener entre 150-160 caracteres",
      "Incluir un llamado a la acción",
      "Destacar el valor único del contenido",
    ],
    example:
      "Aprende a elegir la cadena perfecta para tu moto con nuestra guía experta. Comparamos marcas, tipos y precios para ayudarte a tomar la mejor decisión. ¡Visítanos en Bahía Blanca!",
  },
  headings: {
    description: "Estructura jerárquica de encabezados (H1, H2, H3...)",
    bestPractices: [
      "Usar un solo H1 que incluya la palabra clave principal",
      "Estructurar el contenido con H2 y H3 que incluyan palabras clave secundarias",
      "Mantener una estructura lógica y jerárquica",
      "Hacer que los encabezados sean descriptivos del contenido que sigue",
    ],
    example: `
      H1: Guía Completa: Cómo Elegir la Mejor Cadena para tu Moto
      H2: Tipos de Cadenas para Motos
      H3: Cadenas Selladas vs. No Selladas
      H3: Cadenas O-ring, X-ring y Z-ring
      H2: Marcas Recomendadas de Cadenas para Motos
      H3: Cadenas DID: Características y Modelos
      H3: Cadenas Choho: Características y Modelos
    `,
  },
  content: {
    description: "Cuerpo principal del texto",
    bestPractices: [
      "Incluir la palabra clave principal en el primer párrafo",
      "Usar palabras clave secundarias de forma natural a lo largo del texto",
      "Escribir contenido original y de valor",
      "Mantener párrafos cortos (3-4 líneas) para mejorar la legibilidad",
      "Incluir listas y viñetas para facilitar la lectura",
      "Usar negritas para destacar información importante",
    ],
    example:
      "El contenido debe ser detallado, informativo y útil para el usuario. Debe responder a las preguntas que el usuario podría tener sobre el tema.",
  },
  images: {
    description: "Imágenes incluidas en el contenido",
    bestPractices: [
      "Optimizar el tamaño y formato de las imágenes para carga rápida",
      "Usar nombres de archivo descriptivos con palabras clave",
      "Incluir texto alternativo (alt) descriptivo con palabras clave",
      "Añadir leyendas a las imágenes cuando sea relevante",
    ],
    example: `
      Nombre de archivo: cadena-did-x-ring-para-honda-cg-150.jpg
      Alt text: "Cadena DID X-Ring para Honda CG 150 disponible en Fox Motorepuestos Bahía Blanca"
    `,
  },
  internalLinks: {
    description: "Enlaces a otras páginas del sitio",
    bestPractices: [
      "Incluir 3-5 enlaces internos relevantes",
      "Usar texto ancla descriptivo con palabras clave",
      "Enlazar a páginas de productos relacionados",
      "Crear una estructura de enlazado lógica",
    ],
    example: `
      "Visita nuestra sección de <a href="/productos/cadenas">cadenas para motos</a> para ver todos los modelos disponibles."
      "Si necesitas ayuda con la <a href="/blog/mantenimiento-cadena-moto">instalación y mantenimiento de tu cadena</a>, consulta nuestra guía."
    `,
  },
  externalLinks: {
    description: "Enlaces a otros sitios web",
    bestPractices: [
      "Incluir 1-2 enlaces a fuentes autoritativas",
      "Usar el atributo rel='noopener noreferrer' para enlaces externos",
      "Asegurarse de que los enlaces externos se abran en una nueva pestaña",
      "Enlazar solo a sitios de confianza y relevantes",
    ],
    example: `
      "Según la <a href="https://www.did-daido.co.jp/en/" target="_blank" rel="noopener noreferrer">página oficial de DID</a>, sus cadenas X-ring ofrecen un 50% más de durabilidad."
    `,
  },
  schema: {
    description: "Datos estructurados (Schema.org)",
    bestPractices: [
      "Implementar schema de Article o BlogPosting",
      "Incluir autor, fecha de publicación y modificación",
      "Añadir breadcrumbs estructurados",
      "Implementar schema de Product cuando sea relevante",
    ],
    example: "Usar la función generateArticleSchema() de lib/schema.ts para cada artículo del blog.",
  },
  url: {
    description: "Estructura de la URL",
    bestPractices: [
      "Mantener URLs cortas y descriptivas",
      "Incluir la palabra clave principal",
      "Usar guiones para separar palabras",
      "Evitar parámetros y caracteres especiales",
    ],
    example: "/blog/guia-elegir-cadenas-motos",
  },
}

// Estrategia de promoción de contenido
export const contentPromotion = [
  {
    channel: "Redes Sociales",
    platforms: ["Instagram", "Facebook"],
    strategy: [
      "Publicar extractos del contenido con imágenes atractivas",
      "Crear historias destacando los puntos clave",
      "Programar múltiples publicaciones para cada artículo",
      "Usar hashtags relevantes para la comunidad motera local",
      "Etiquetar a marcas mencionadas en el contenido",
    ],
    frequency: "3-4 publicaciones por artículo",
  },
  {
    channel: "Email Marketing",
    platforms: ["Newsletter"],
    strategy: [
      "Enviar resúmenes de los artículos más recientes",
      "Segmentar la lista según intereses (tipos de motos, marcas)",
      "Incluir llamados a la acción claros",
      "Personalizar el contenido según el historial de compras",
    ],
    frequency: "Newsletter quincenal",
  },
  {
    channel: "WhatsApp Business",
    platforms: ["WhatsApp"],
    strategy: [
      "Crear listas de difusión por categorías de interés",
      "Compartir enlaces a artículos relevantes con clientes",
      "Usar el estado de WhatsApp para promocionar nuevo contenido",
      "Responder consultas con enlaces a artículos relacionados",
    ],
    frequency: "1-2 veces por semana",
  },
  {
    channel: "Grupos y Foros",
    platforms: ["Grupos de Facebook", "Foros de motos"],
    strategy: [
      "Participar activamente en grupos locales de motociclistas",
      "Compartir contenido valioso sin ser demasiado promocional",
      "Responder preguntas con enlaces a artículos relevantes",
      "Organizar debates sobre temas tratados en el blog",
    ],
    frequency: "Participación diaria",
  },
  {
    channel: "Colaboraciones",
    platforms: ["Blogs de terceros", "Influencers locales"],
    strategy: [
      "Identificar blogs e influencers relevantes en el sector",
      "Proponer artículos invitados o colaboraciones",
      "Ofrecer contenido exclusivo para sus audiencias",
      "Intercambiar enlaces y menciones",
    ],
    frequency: "1-2 colaboraciones mensuales",
  },
  {
    channel: "Tienda Física",
    platforms: ["Local comercial"],
    strategy: [
      "Crear códigos QR que enlacen a artículos relevantes",
      "Mencionar el blog durante la atención al cliente",
      "Imprimir extractos de artículos para entregar con las compras",
      "Organizar pequeños eventos basados en temas del blog",
    ],
    frequency: "Implementación continua",
  },
  {
    channel: "Google My Business",
    platforms: ["GMB"],
    strategy: [
      "Publicar actualizaciones con enlaces a nuevos artículos",
      "Incluir fotos relacionadas con el contenido",
      "Responder preguntas con enlaces al blog",
      "Mantener actualizada la información de la ficha",
    ],
    frequency: "1-2 publicaciones semanales",
  },
]
