const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./webpack.base");
const devConfig = {
  mode: "none",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
    stats: "errors-only",
  },
};

module.exports = merge(baseConfig, devConfig);
