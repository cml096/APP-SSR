/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images-assets.nasa.gov']
    },
    async rewrites () {
        return [
            {
                source: '/galaxia/:path*',
                destination: '/galaxy/:path*',
            },
        ]
    },
}

module.exports = nextConfig