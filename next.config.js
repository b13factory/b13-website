/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize chunk splitting untuk better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split vendor chunks untuk better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk untuk react & react-dom
          react: {
            name: 'react-vendor',
            test: /[\/]node_modules[\/](react|react-dom)[\/]/,
            priority: 40,
            reuseExistingChunk: true,
          },
          // Vendor chunk untuk lucide-react icons
          icons: {
            name: 'icons-vendor',
            test: /[\/]node_modules[\/]lucide-react[\/]/,
            priority: 30,
            reuseExistingChunk: true,
          },
          // Common chunks untuk code yang digunakan di multiple pages
          common: {
            name: 'common',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Note: usedExports dan sideEffects removed karena konflik dengan Next.js default optimization
      // Next.js 14 sudah handle tree-shaking secara otomatis dengan SWC
    }
    return config;
  },
  // Reduce JavaScript payload
  productionBrowserSourceMaps: false,
  // Experimental features for better performance
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: ['lucide-react'], // Tree-shake lucide-react automatically
  },
};

module.exports = nextConfig;
