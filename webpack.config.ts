import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export type BuildMode = 'production' | 'development';

export interface buildEnv {
    mode: BuildMode,
    port: number,
}

export default (env: buildEnv) => {
    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const isDev = mode === 'development';

    // : webpack.Configuration
    const config = {
        mode,
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        devtool: isDev ? 'inline-source-map' : undefined,

        devServer: isDev ? {
            port: PORT,
            open: true,
            hot: true,
        } : undefined,

        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
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
                }
            ],
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                'stream': false,
                'util': false,
                'diagnostics_channel': false,
                'worker_threads': false,
                'perf_hooks': false,
                'net': false,
                'tls': false,
                'async_hooks': false
            }
        },
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new webpack.ProgressPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new NodePolyfillPlugin()
        ],
    };

    return config;
};
