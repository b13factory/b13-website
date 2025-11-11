/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize for modern browsers
  experimental: {
    modern: true,

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
          },
          // Vendor chunk untuk lucide-react icons
          icons: {
            name: 'icons-vendor',
            test: /[\/]node_modules[\/]lucide-react[\/]/,
            priority: 30,
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
    }
    return config;
  },
  },
  // Reduce JavaScript payload
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;