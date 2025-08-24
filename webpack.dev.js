const { merge } = require('webpack-merge');
const common = require('./webpack.config');
const path = require("path");

module.exports = merge(common, {
  mode: 'development',
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
})