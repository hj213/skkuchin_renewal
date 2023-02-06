/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['skkuchin2023-bucket.s3.ap-northeast-2.amazonaws.com']
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'skkuchin2023-bucket.s3.ap-northeast-2.amazonaws.com',
    //     port: '',
    //     pathname: '/dev/**',
    //   },
    // ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
