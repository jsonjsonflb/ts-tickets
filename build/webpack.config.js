const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const devMode = process.env.NODE_ENV !== 'production';
const CopyPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const config = {
  entry: '../src/index.tsx',
  output: {
    filename: 'bundle.[contentHash:6].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[id].[contentHash:6].js'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: '../src/index.html' }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'statics/css/[name].[contentHash:6].css?v=[contentHash:6]',
      chunkFilename: '[id].css?v=[contentHash:6]',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin([
      { from: path.resolve(__dirname, '../src/lib'), to: 'lib' }
    ]),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  chrome: '57'
                },
                corejs: { version: 3, proposals: true },
                useBuiltIns: 'usage'
              }
            ],
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            'react-hot-loader/babel'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: devMode
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 向前两个loader，确保都加上前缀
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': resolve('src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

module.exports = () => {
  if (process.env && process.env.NODE_ENV === 'production') {
    console.log('production');
    return merge(config, prodConfig);
  } else {
    console.log('devlopment');
    return merge(config, devConfig);
  }
};
