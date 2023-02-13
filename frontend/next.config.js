/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	// disable: process.env.NODE_ENV === 'development',
	// register: true,
	// scope: '/app',
	sw: 'service-worker.js',
	dynamicStartUrlRedirect: true
	//...
})

const nextConfig = withPWA({
	images: {
		domains: ['skkuchin2023-bucket.s3.ap-northeast-2.amazonaws.com']
	},
	reactStrictMode: true,
	swcMinify: true,
});

module.exports = nextConfig;
