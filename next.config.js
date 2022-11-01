/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images : {
    domains : ['cdn-icons-png.flaticon.com',"images4.alphacoders.com"]
  }

}

module.exports = nextConfig
