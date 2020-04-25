const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendErrorsPlugin = require("friendly-errors-webpack-plugin");
const speedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
const smp = new speedMeasureWebpackPlugin();

const glob = require("glob");
const path = require("path");
const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ["vendors", pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
        },
      })
    );
  });

  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
          "babel-loader",
        ],
      },
      {
        test: /.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                }),
              ],
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecision: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash].[ext]",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new FriendErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: require("./build/library/library.json"),
    // }),
    // new BundleAnalyzerPlugin(),
  ].concat(HtmlWebpackPlugins),
    stats: "errors-only",
};
