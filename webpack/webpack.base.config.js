const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
};

module.exports = {
    entry: {
        app: `${PATHS.src}/app.js`,
    },
    output: {
        path: PATHS.dist,
        filename: 'app.js',
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules',
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader,
              {
                loader: "css-loader", 
              },
              {
                loader: "postcss-loader",
                options:{
                  postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js')
                  }
                }   
              },
              {
                loader: "sass-loader"
              }],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        /*
        new CopyPlugin({
            patterns: [
              {
                // Img
                from: `${PATHS.src}/assets/img/`,
                to: `${PATHS.dist}/assets/img/`,
              },
            ],
        }),
        */
    ]
}