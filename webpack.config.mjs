import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using fileURLToPath and path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const webpackConfig = {
    entry: './public/src/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/src'),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    node: {
        global: false
    }
};

export default webpackConfig;