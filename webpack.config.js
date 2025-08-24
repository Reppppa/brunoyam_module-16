const HtmlPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './public'),
    },
    port: 7777,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          }
        },
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
    })],
  },
  plugins: [
    new CleanPlugin(),
    new HtmlPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: 'assets' }],
    })
  ]
}