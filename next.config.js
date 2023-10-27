/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.outlet.mn'],
      },
      experimental: {
        serverActions: true,
      },
}

module.exports = nextConfig
