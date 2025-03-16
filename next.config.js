/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.coach.com', 'img.coach.com'],
  },
  async redirects() {
    return [
      // ... 其他重定向
      {
        source: '/inventory',
        destination: '/inventory',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 