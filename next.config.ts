/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add 85 to the qualities array
    qualities: [75, 85],
  },
  // Enable Turbopack
  experimental: {
    turbo: {
      rules: {
        "*.ts": {
          loaders: ["typescript"],
        },
        "*.tsx": {
          loaders: ["typescript"],
        },
      },
    },
  },
};

module.exports = nextConfig;
