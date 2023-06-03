const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: {
        content: path.resolve(__dirname, "src", "content.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            "buffer": require.resolve("buffer")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }]
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    ],
};