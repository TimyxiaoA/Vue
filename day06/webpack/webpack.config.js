const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
	template: './src/index.html', // 根据此模板生成文件
	filename: 'index.html' // 生成 index.html 这个文件
});

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const vuePlugin = new VueLoaderPlugin();

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, './src/index.js'), //入口
	output: {
		path: path.join(__dirname, './dist'), // 文件夹
		filename: 'bundle.js' // 打包之后的文件名
	},
	plugins: [htmlPlugin, vuePlugin], //使用插件
	devServer: {
		open: true, //直接打开
		host: '127.0.0.1', // url地址
		port: 8888 //端口号
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
				// 小于等于 limit 大小的图片会被转为 base64
				use: [
					{
						loader: 'url-loader',
						options: {
							esModule: false
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: 'html-withimg-loader'
			}
		]
	}
};
