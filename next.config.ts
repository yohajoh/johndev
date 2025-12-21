/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["nodemailer", "resend"],
  },
};

module.exports = nextConfig;
