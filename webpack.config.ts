import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export type BuildMode = 'production' | 'development';

export interface buildEnv {
	mode: BuildMode;
	port: number;
}

export default (env: buildEnv) => {
	const mode = env.mode || 'development';
	const PORT = env.port || 3000;
	const isDev = mode === 'development';

	const config = {
		mode,
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		devtool: isDev ? 'inline-source-map' : undefined,

		devServer: isDev
			? {
					port: PORT,
					open: true,
					hot: true,
			  }
			: undefined,

		module: {
			rules: [
				{
					test: /\.(js|jsx|tsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				},
				{
					test: /\.(png|jpe?g|gif|woff2|woff)$/i,
					use: [
						{
							loader: 'file-loader',
						},
					],
				},
			],
		},

		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@store': path.resolve(__dirname, 'src/store'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@assets': path.resolve(__dirname, 'src/assets'),
			},
		},
		output: {
			filename: '[name].[contenthash].js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
			new webpack.ProgressPlugin(),
			new webpack.HotModuleReplacementPlugin(),
		],
	};

	return config;
};
