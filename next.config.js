/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Optional, for specific ports
        pathname: '/**', // Match all paths
      },
    ],
  },
};

module.exports = nextConfig;
