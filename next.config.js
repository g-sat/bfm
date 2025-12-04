/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.plugins.push(
                new JavaScriptObfuscator({
                    rotateStringArray: true,
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    encodeThis: 'false',
                    transformObjectKeys: true,
                    seed: 0,
                }, ['excluded_bundle_name.js'])
            );
        }
        return config;
    },
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
            },
        ],
    },
};

module.exports = nextConfig;