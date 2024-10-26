const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    (config) => {
        // Add fallback for Node.js core modules
        config.resolve.fallback = {
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url'),
        };

        // Optional: Add aliases for easier imports
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'), // Example alias for src
        };

        return config;
    }
);
