const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

module.exports = {
	mode: 'development',
	entry: {
		app: './src/index.js',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
	    new HtmlWebpackPlugin({
			title: 'Petoo',
			meta: {
				viewport: 'width=device-width, initial-scale=1'
			}
		}),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},
			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devtool: 'inline-source-map',

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
				  'style-loader',
				  'css-loader'
				],
			},
			{
			  test: /\.(png|svg|jpg|gif)$/,
				use: [
				'file-loader',
				],
			}
		]
	},

	devServer: {
		open: true,
		contentBase: './dist',
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
