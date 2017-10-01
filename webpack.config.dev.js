const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { optimize: { CommonsChunkPlugin } } = webpack

module.exports = {
  entry: {
    app: './lib/index.js',
    commons: [
      'babel-polyfill'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dev'),
    publicPath: '/',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?importLoaders=1', 'postcss-loader', 'stylus-loader']
        })
      },
      {
        test: /\.pug$/,
        use: ['pug-loader?pretty=true']
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false,
      options: {
        postcss: [
          autoprefixer()
        ]
      }
    }),
    new CommonsChunkPlugin({
      name: 'commons',
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: true,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: false
      },
      comments: true
    }),
    new ExtractTextPlugin('./[name].css'),
    new CopyPlugin([{
      context: path.resolve(__dirname, 'static'),
      from: '**/*',
      to: path.resolve(__dirname, 'dev')
    }]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3005,
      server: { baseDir: ['dev'] }
    }),
    new HtmlWebpackPlugin({
      title: 'PWA Initial Project - Dev',
      description: 'Progressive Web Application (simple architecture without frameworks)',
      template: './lib/index.pug',
      inject: 'body'
    })
  ]
}
