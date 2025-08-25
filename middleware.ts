import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isProduction } from "./lib/url-utils"
import { updateSession } from "./lib/supabase/middleware"

// Este middleware se ejecuta en cada solicitud
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""

  // Solo aplicar redirecciones en producción
  if (isProduction()) {
    // Redirigir de dominio sin www a dominio con www (canonicalización)
    if (hostname === "foxmotorepuestos.com") {
      // Asegurarse de mantener el protocolo original
      const protocol = request.nextUrl.protocol || "https:"
      url.host = "www.foxmotorepuestos.com"
      url.protocol = protocol
      return NextResponse.redirect(url)
    }

    // Redirigir de HTTP a HTTPS
    if (request.nextUrl.protocol === "http:") {
      url.protocol = "https:"
      return NextResponse.redirect(url)
    }
  }

  if (request.nextUrl.pathname.startsWith("/tienda/admin")) {
    return await updateSession(request)
  }

  // Permitir que la solicitud continúe
  return NextResponse.next()
}

// Configurar el middleware para que se ejecute en todas las rutas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos de Next.js)
     * 3. /_static (si estás usando imágenes estáticas)
     * 4. /favicon.ico, /robots.txt, etc.
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}
