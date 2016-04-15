var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // cache: true,
  entry: [
    'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/scripts/app.js' // Your appʼs entry point
  ],
  // './src/scripts/app.jsx',
  output: {
    path: './src/scripts',
    filename: 'app.js',
    publicPath: './src/'
  },
  module: {
    loaders: [
      // {
      //   test: /\.jsx?$/,
      //   exclude: /(node_modules|bower_components)/,
      //   loader: 'babel', // 'babel-loader' is also a legal name to reference
      //   query: {
      //     presets: ['react', 'es2015']
      //   }
      // },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'jsx?harmony'],
        include: path.join(__dirname, 'src')
      },{
        test: /\.less?$/,
        loader: 'style!css!less'
      }
    ]
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('./src/styles/app.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
};