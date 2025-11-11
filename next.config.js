/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization configuration
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production (keep console.error for critical errors)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Optimize chunk splitting untuk better code splitting
  webpack: (config, { isServer, dev }) => {
    
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

      // Tree shaking untuk lucide-react
      config.resolve.alias = {
        ...config.resolve.alias,
        'lucide-react': 'lucide-react/dist/esm/index.js',
      };
    }
    
    return config;
  },
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Compress responses
  compress: true,
  
  // Power by header removal
  poweredByHeader: false,
  
  // Generate ETags for better caching
  generateEtags: true,
  
  // HTTP headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;