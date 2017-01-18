var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /*
  entry: [
    './lib/src/app.js',
  ],
  */
  entry:{
    'page1': './lib/src/app.js',
    'page2': './lib/src/page2/main.js'
  },
  output: {
    path: path.join(__dirname, './public/js/'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: { presets: ['react', 'es2015'],
        plugins: ['recharts']}
    },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['page1'],
      filename: 'public/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['page2'],
      filename: 'public/test.html'
    })
  ]
};
