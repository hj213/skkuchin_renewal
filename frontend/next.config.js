/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production',
	sw: 'service-worker.js',
	dynamicStartUrlRedirect: '/login'
})

const nextConfig = withPWA({
	devIndicators: {
        buildActivity: false
    },
	eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
	images: {
		sizes: "250px",
		imageSizes: [64, 96, 128, 256],
		deviceSizes: [640, 750, 828, 1080],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'skkuchin2023-bucket.s3.ap-northeast-2.amazonaws.com',
				pathname: '/**',
			},
		],
	},
	reactStrictMode: true,
	swcMinify: true
});

module.exports = nextConfig;