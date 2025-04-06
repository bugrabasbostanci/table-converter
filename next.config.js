/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'out',
  images: {
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig