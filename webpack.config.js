const webpack = require('webpack');
const path = require('path');
const appPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: appPath,
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: distPath
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
        inject: 'body',
        template: './template.html'
    }),
    new CopyWebpackPlugin([
      { from: './images', to: './images' }
    ]),
    new CleanPlugin(['dist'])
  ],

  module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, 'src')
				],
				loader: 'babel-loader',
				query: {
					compact: true,
					presets: [
						['es2015', {modules: false}]
					]
				}
			}
		]
	}

};
