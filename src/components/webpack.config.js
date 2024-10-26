const path = require('path');

module.exports = {
    entry: './src/index.js', // Adjust this to your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output bundle file name
        publicPath: '/', // Public URL of the output directory when referenced in a browser
    },
    mode: 'development', // Change to 'production' for production builds
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Regular expression to match .js and .jsx files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: {
                    loader: 'babel-loader', // Use Babel to transpile JS/JSX
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Include presets for React
                    },
                },
            },
            {
                test: /\.css$/, // Regular expression to match .css files
                use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for styles
            },
            // You can add more loaders here for different file types (e.g., images, fonts)
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve these file extensions
        fallback: {
            http: require.resolve('stream-http'), // Fallback for http module
            https: require.resolve('https-browserify'), // Fallback for https module
            url: require.resolve('url'), // Fallback for url module
        },
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Serve content from the dist directory
        compress: true, // Enable gzip compression
        port: 3000, // Port for the dev server
        historyApiFallback: true, // Support for HTML5 history API
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // Enable code splitting for all chunks
        },
    },
    performance: {
        hints: false, // Disable performance hints (optional)
    },
};
