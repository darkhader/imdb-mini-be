const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const sass = require('sass');

const ENV = 'development';

module.exports = options =>
  merge(common({ env: ENV }), {
    mode: 'production',
    devtool: false,
    entry: [path.resolve('src', 'index.tsx')],
    output: {
      path: path.resolve('dist'),
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].[hash].chunk.js'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: { implementation: sass }
            }
          ]
        },
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        }  
      ]
    },
    optimization: {
      runtimeChunk: false,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        filename: 'assets/[name].[hash].css',
        chunkFilename: 'assets/[name].[hash].css'
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    ]
  });
