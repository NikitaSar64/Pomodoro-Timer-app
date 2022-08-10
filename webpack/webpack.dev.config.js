const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');


module.exports = merge(baseWebpackConfig, {
    devServer: {
        hot: true,
        open: true,
        watchFiles: path.resolve(__dirname, '../src'),
    },
})