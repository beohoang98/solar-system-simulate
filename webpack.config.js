const HtmlPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

/**
 * @type {import("webpack").Configuration}
 */
module.exports = (env) => ({
    entry: resolve(__dirname, "./src/index.ts"),
    devtool: env.production ? "source-map" : "eval",
    output: {
        clean: true,
        asyncChunks: true,
        path: resolve(__dirname, "./dist"),
        filename: "index.[fullhash].js",
    },
    devServer: {
        hot: true,
        host: "0.0.0.0",
        port: process.env.PORT || 8080,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    plugins: [
        new HtmlPlugin({
            template: resolve(__dirname, "./src/index.html"),
            favicon: false,
            title: "Solar System",
            minify: "auto",
        }),
    ],
});
