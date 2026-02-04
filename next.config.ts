/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverExternalPackages: ["nodemailer", "resend"],
  // Add this part:
  typescript: {
    ignoreBuildErrors: true,
  },
  // If you have ESLint errors too, add this:
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
