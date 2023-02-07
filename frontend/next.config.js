/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['skkuchin2023-bucket.s3.ap-northeast-2.amazonaws.com']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
