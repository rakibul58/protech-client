/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*", 'images.unsplash.com'], // Add the domain of the external image source
  },
};

module.exports = nextConfig;
