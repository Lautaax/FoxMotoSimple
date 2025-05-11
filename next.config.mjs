/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['foxmotorepuestos.com', 'www.foxmotorepuestos.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foxmotorepuestos.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.foxmotorepuestos.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' foxmotorepuestos.com www.foxmotorepuestos.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' foxmotorepuestos.com www.foxmotorepuestos.com;
              style-src 'self' 'unsafe-inline' foxmotorepuestos.com www.foxmotorepuestos.com;
              img-src 'self' data: blob: foxmotorepuestos.com www.foxmotorepuestos.com;
              font-src 'self' foxmotorepuestos.com www.foxmotorepuestos.com;
              connect-src 'self' foxmotorepuestos.com www.foxmotorepuestos.com;
              frame-src 'self' foxmotorepuestos.com www.foxmotorepuestos.com www.google.com;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'foxmotorepuestos.com',
          },
        ],
        destination: '/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.foxmotorepuestos.com',
          },
        ],
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
