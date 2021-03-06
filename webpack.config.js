const webpack = require('webpack');
const path = require('path');
const appPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: appPath,
  entry: [
    'webvr-polyfill/build/webvr-polyfill',
    'three/examples/js/controls/VRControls',
    'three/examples/js/effects/VREffect',
    './index.js'],
  output: {
    filename: 'bundle.js',
    path: distPath
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host:'0.0.0.0',
    disableHostCheck: true,
    port: 8080
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
        inject: 'body',
        template: './template.html'
    }),
    new CopyWebpackPlugin([
      { from: './images', to: './images' },
      { from: './data', to: './data' },
      { from: './fonts', to:'./fonts'},
      { from: './presentation', to:'./presentation'},
      { from: './tramchester', to:'./tramchester'}
    ]),
    new webpack.ProvidePlugin({
      'THREE': 'three'
    }),
    new CleanPlugin(['dist'])
  ],

  module: {
    noParse: /node_modules\/webvr-polyfill\/build/,
		loaders: [
      {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
              path.resolve(__dirname, 'src')
          ],
          query: {
              presets: ['es2015']
          }
      }
    ]

	}

};
