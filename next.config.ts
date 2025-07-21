/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/material'],
  experimental: {
    serverActions: true,
    reactRoot: true,
    esmExternals: 'loose',
    typedRoutes: true // baru di Next 15, supaya routing TS lebih aman
  },
  reactStrictMode: true,
  images: {
    domains: ["localhost", "yourdomain.com"], // Kalau kamu load image dari luar
  },
};

module.exports = nextConfig;
