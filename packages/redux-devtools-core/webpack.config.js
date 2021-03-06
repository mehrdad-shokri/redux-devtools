const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => ({
  mode: env.development ? 'development' : 'production',
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/' + env.platform),
    publicPath: '',
    filename: 'js/[name].js',
    sourceMapFilename: 'js/[name].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(png|gif|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: '25000',
          outputPath: 'images/',
          publicPath: 'images/',
        },
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file-loader',
        options: { outputPath: 'fonts/', publicPath: 'fonts/' },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(
          env.development ? 'development' : 'production'
        ),
        PLATFORM: JSON.stringify(env.platform),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
    }),
  ],
  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  devServer: {
    port: 3000,
  },
  devtool: env.development ? 'eval-source-map' : 'source-map',
});
