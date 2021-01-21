const path = require('path'); // node.jsのインポート文
module.exports = { // node.jsのexport文
    entry: './dist/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') // __dirname(現在のディレクトリの絶対パス)
    }
}