/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
    'images.unsplash.com',
    'via.placeholder.com',
    'b13factory-garmentadv.netlify.app' // ✅ domain Netlify kamu
  ],
    formats: ['image/avif', 'image/webp'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // pindahkan webpack ke sini (root), bukan ke experimental!
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          react: {
            name: 'react-vendor',
            test: /[\/]node_modules[\/](react|react-dom)[\/]/,
            priority: 40,
          },
          icons: {
            name: 'icons-vendor',
            test: /[\/]node_modules[\/]lucide-react[\/]/,
            priority: 30,
          },
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

  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
