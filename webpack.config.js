const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/main.js', // this is the main file you want to use as the controller
	output: {
		path: path.resolve(__dirname, 'dist'), // this is in the project folder in the 'dist' folder
		filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html', // this is what we want to call the file
			template: './src/index.html' // this is where to get the source code from
		}),
	]
};