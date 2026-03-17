/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        turbopackUseSystemTlsCerts: true,
    },
};

module.exports = nextConfig;