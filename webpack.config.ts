import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
            open: true
        } : undefined,

        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
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
            ],
        },

        // Uncaught TypeError: The "original" argument must be of type Function
        // Module not found: Error: Can't resolve 'diagnostics_channel, async_hooks, worker_threads
        resolve: {
            fallback: {
                "buffer": false,
                "stream": false,
                "assert": false,
                "url": false,
                "http": false,
                "util": false,
                "zlib": false,
                "os": false,
                "querystring": false,
                "https": false,
                "console": false,
                "net": false,
                "tls": false,
                // "diagnostics_channel": false,
                // "async_hooks": false,
                // "perf_hooks": false,
                // "worker_threads": false,
                "crypto": require.resolve("crypto-browserify")
            },
            extensions: ['.tsx', '.ts', '.js'],
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
        ],
    };

    return config;
};
