/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Move this out of experimental and rename it
  serverExternalPackages: ["nodemailer", "resend"],
  experimental: {
    // Other experimental features go here if you have them
  },
};

module.exports = nextConfig;
