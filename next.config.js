/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    webpack: (config, options) => {
        config.resolve.fallback = {
            'fs': require.resolve('./src/utils/fs.js'),
        }

        return config
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '750mb',
        }
    }
}

module.exports = nextConfig
