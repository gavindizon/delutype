const path = require("path");

/**
 * @type {import('next').NextConfig}
 *  */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true,
    },
    unstable_includeFiles: ["node_modules/next/dist/compiled/@edge-runtime/primitives/**/*.+(js|json)"],
};

module.exports = nextConfig;
