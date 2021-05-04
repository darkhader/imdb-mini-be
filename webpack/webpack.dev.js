const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const sass = require('sass');
const ENV = 'development';

module.exports = options =>
  merge(common({ env: ENV }), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: [path.resolve('src', 'index.tsx')],
    output: {
      path: path.resolve('dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
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
    devServer: {
      contentBase: './dist',
      hot: true,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
