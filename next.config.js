/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  
  // Aşağıdaki ayarı ekleyin
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  
  // Eğer App Router'da dinamik route'lar kullanıyorsanız
  generateStaticParams: async () => {
    return {
      // Dinamik route'larınızı burada belirtin
      '/': { page: '/' },
    };
  }
}

module.exports = nextConfig;