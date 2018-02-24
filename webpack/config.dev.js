const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    paths.entryJs,
  ],
  output: {
    path: paths.build,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({ flexbox: 'no-2009' }),
              ],
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: paths.scssResources,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|eot|svg|ttf|woff|woff2)/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
            name: '[name].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.htmlTemplate,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new CopyWebpackPlugin([{
      from: paths.publicFiles,
      to: paths.build,
      ignore: ['index.html'],
    }]),
    new webpack.HotModuleReplacementPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: paths.serviceWorker,
    }),
  ],
  devServer: {
    contentBase: paths.build,
    compress: true,
    hot: true,
    port: 4000,
    historyApiFallback: true,
  },
};
