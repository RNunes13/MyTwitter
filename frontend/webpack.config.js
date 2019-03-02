const path = require('path');
const Package = require('pjson');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  node_env,
  host,
  port,
} = require('./src/configs/environments.config');

const isProd = node_env === 'production';

module.exports = {
  context: path.join(__dirname, 'src'),
  mode: isProd ? 'production' : 'development',

  /* Source maps */
  devtool: !isProd ? 'inline-source-map' : '',

  /* Mocks the FS module in the browser */
  node: {
    fs: "empty"
  },

  entry: [
    './main.tsx'
  ],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ]
  },

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  /* Development server */
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
    port,
    host,
  },

  plugins: [
    /* Generates the root index based on template */
    new HtmlWebpackPlugin({
      title: Package.name,
      version: Package.version,
      favicon: path.resolve(__dirname, './src/assets/favicon.ico'),
      template: path.resolve(__dirname, './src/index.html'),
    }),

  ],

  module: {
    rules: [
      /* Typescript Loader */
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      },

      /* Stylesheet loaders */
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
              convertToAbsoluteUrls: true
            }
          },
          // translates CSS into CommonJS
          { loader: "css-loader" },
          // compiles Sass to CSS 
          { loader: "sass-loader" }
        ],
      },

      /* Image loader */
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: ['file-loader'],
      },

      /* Font loader */
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        use: ['file-loader'],
      },

      /* JSON loader */
      {
        test: /\.json$/,
        exclude: [/node_modules/],
        use: ['json-loader'],
      },
    ]
  }
}
