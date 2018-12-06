var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    rules: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    { 
      test: /\.styl$/, 
      include: path.join(__dirname, 'client'),
      loader: 'style-loader!css-loader!stylus-loader'
    },
    {
      test: /\.(png|jpg)$/,
      include: path.join(__dirname, 'client'),
      loader: 'url-loader'
    },
    {
      test: /\.mp3$/,
      include: path.join(__dirname, 'client'),
      loader: 'file-loader'
    }

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
