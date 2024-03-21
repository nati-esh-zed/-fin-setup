const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, './index.ts'),
  module: {
    rules: [
      {
        test: /\.(ts|js)$/i,
        exclude: /node_modules/i,
        use: ['babel-loader']
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
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
    ]
  },
  resolve: {
    extensions: [".*", ".js", ".ts", ".mjs", ".mts"]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, './dist')
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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "./" }
      ],
    })
  ]
};
