/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/prayer-focus',
        destination: '/branches',
        permanent: true,
      },
      {
        source: '/ebomiprays',
        destination: '/join-us',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

