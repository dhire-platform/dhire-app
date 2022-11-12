/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'img.etimg.com',
      'cdn-icons-png.flaticon.com',
      'm.media-amazon.com',
      'upload.wikimedia.org',
      'http://logok.org',
      'logok.org',
    ],
  },
  reactStrictMode: true,
  concurrentFeatures: true,
  swcMinify: true,
};

module.exports = nextConfig;
 