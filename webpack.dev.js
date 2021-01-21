const path = require('path'); // node.jsのインポート文
module.exports = { // node.jsのexport文
    mode: 'development',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // __dirname(現在のディレクトリの絶対パス)
        publicPath: '/dist/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/ // node_modules配下対象外
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}