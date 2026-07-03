/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dev-to-uploads.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: '*.dev.to',
            },
        ],
    },
    async redirects() {
        // Old title-derived project URLs → new short slugs
        return [
            { source: '/projects/koriai---intelligent-korean-language-ecosystem', destination: '/projects/koriai', permanent: true },
            { source: '/projects/enterprise-learning-hub---korea-standard-stack', destination: '/projects/enterprise-learning-hub', permanent: true },
            { source: '/projects/money-flow---precision-finance-engine', destination: '/projects/money-flow', permanent: true },
            // WeBill365 removed from the portfolio — send old URLs to the projects list
            { source: '/projects/webill365---vietnam-fintech-ecosystem', destination: '/projects', permanent: true },
            { source: '/projects/webill365', destination: '/projects', permanent: true },
            { source: '/projects/warehouse-master---b2b-supply-chain-platform', destination: '/projects/warehouse-master', permanent: true },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/api/:path*',
            },
        ];
    },
};

module.exports = nextConfig;
