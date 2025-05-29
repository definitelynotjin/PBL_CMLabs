const path = require('path');

const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
// This configuration file sets up a Next.js project with an alias for the 'src' directory
// and disables image optimization, allowing for unoptimized images to be used.
