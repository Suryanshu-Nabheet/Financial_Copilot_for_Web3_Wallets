/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { isServer }) => {
    // Ignore optional dependencies that aren't needed for browser builds
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'pino-pretty': false,
      };
    }
    
    return config;
  },
  // Production optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
  // Production build settings
  eslint: {
    ignoreDuringBuilds: true, // Set to false in production after fixing all lint errors
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig

