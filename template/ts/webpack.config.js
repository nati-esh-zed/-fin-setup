const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, './index.ts'),
  resolve: {
    extensions: [".*", ".js", ".ts", ".mjs", ".mts"]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/bundle.js',
    assetModuleFilename: "assets/[name][ext]"
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ],
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/i, // Process .scss files with "sass-loader", "css-loader", "postcss-loader", and "MiniCssExtractPlugin".
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files for production build.
          "css-loader", // Translates CSS into CommonJS.
          "postcss-loader", // PostCSS is used for autoprefixing CSS for better cross-browser support.
          "sass-loader", // Compiles SCSS to CSS.
        ],
      },
      {
        test: /\.(ts|mts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Use @babel/preset-env to transpile modern JavaScript to older versions for wider browser compatibility.
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
            filename: './assets/image/[name][ext]',
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
        generator: {
            filename: './assets/fonts/[name][ext]',
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name][contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "./" }
      ],
    })
  ],
};
