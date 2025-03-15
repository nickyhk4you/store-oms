const nextConfig = {
  // ... 其他配置
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