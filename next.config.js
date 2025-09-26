/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    webpack: (config, options) => {
        config.resolve.fallback = {
            'fs': require.resolve('./src/components/Book/Form/fs.js'),
        }

        return config
    },
}

module.exports = nextConfig
