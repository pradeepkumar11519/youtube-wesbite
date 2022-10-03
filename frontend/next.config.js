/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['dummyimage.com','nymag.com','encrypted-tbn0.gstatic.com','photos.google.com']
  }
}

module.exports = nextConfig
