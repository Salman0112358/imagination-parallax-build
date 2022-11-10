/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "cdn-icons-png.flaticon.com",
      "images4.alphacoders.com",
      "lexica-serve-encoded-images.sharif.workers.dev",
      "cdn.dribbble.com",
      "obkxriydkcaxsfsmgddi.supabase.co",
      "image.lexica.art",
    ],
  },
};

module.exports = nextConfig;
