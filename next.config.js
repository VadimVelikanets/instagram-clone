/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}
module.exports = {
  images: {
    domains: ['assets.vercel.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig