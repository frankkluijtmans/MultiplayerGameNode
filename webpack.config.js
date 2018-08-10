process.env.STAGE = ( process.env.STAGE ) ? process.env.STAGE : 'dev';
const debug = process.env.STAGE === 'dev' || process.env.debug === 'true';
const webpack = require('webpack');

let babelOptions = {
	"presets": [
		"env"
	]
};

module.exports = {
	entry: {
		game: './src/game.ts'
	},
	output: {
		path: __dirname + "/public",
		publicPath: '/public',
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					},
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts']
	}
};