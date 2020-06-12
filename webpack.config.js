const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const Dotenv = require("dotenv-webpack");
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const path = require("path");

// const smp = new SpeedMeasurePlugin();

module.exports = {
  devtool: "source-map", //dev: "source-map" / production: false / cheap-module-eval-source-map
  mode: "development", // development || production
  entry: "./src/index.js",
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: "happypack/loader?id=happy_js_babel",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: "happypack/loader?id=happy_styles",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin({ parallel: 16 })]
  // },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new BundleAnalyzerPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new HappyPack({
      id: "happy_js_babel",
      loaders: ["babel-loader?cacheDirectory=true"],
      threads: 16,
      verbose: true,
      threadPool: happyThreadPool,
      // cache: true,
      debug: false,
    }),
    new HappyPack({
      id: "happy_styles",
      loaders: ["style-loader", "css-loader"],
      threads: 16,
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: "happy_images",
      loaders: [
        {
          loader: "url-loader",
          options: {
            esModule: false,
            outputPath: "images/", // output /dist/images/${photo_name}”
            publicPath: "/images", // import path ""/images/${photo_name}"
            limit: 8192, // limit (return url if the file size more than 8192 bytes)
            name: "[name].[hash:8].[ext]", // photo name
          },
        },
      ],
      threads: 16,
      verbose: true,
      threadPool: happyThreadPool,
      // cache: true,
      debug: false,
    }),
    new ProgressBarPlugin({
      format: "  build [:bar] " +
        chalk.green.bold(":percent") +
        " (:elapsed seconds)",
    }),
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/Components"),
    },
  },
};
