const merge = require("webpack-merge");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
// const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const baseConfig = require("./webpack.base");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const prodConfig = {
  mode: "production",
  plugins: [
    new OptimizeCss({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://unpkg.com/react@16/umd/react.production.min.js",
    //       global: "React",
    //     },
    //     {
    //       module: "react-dom",
    //       entry:
    //         "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
    //       global: "ReactDOM",
    //     },
    //   ],
    // }),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        cache: true,
      }),
    ],
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: "vendors",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
