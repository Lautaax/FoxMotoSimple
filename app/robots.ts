import { getBaseUrl } from "@/lib/url-utils"

export default function robots() {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/", "/api/", "/_next/", "/server-sitemap.xml", "/*.json$", "/*.js$", "/*.css$"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/private/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/productos/", "/public/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
