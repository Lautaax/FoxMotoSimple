import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Este middleware se ejecuta en cada solicitud
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get("host") || ""
  const isRootPath = url.pathname === "/"

  // Redirigir de dominio sin www a dominio con www (canonicalización)
  if (hostname === "foxmotorepuestos.com") {
    url.host = "www.foxmotorepuestos.com"
    return NextResponse.redirect(url)
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
