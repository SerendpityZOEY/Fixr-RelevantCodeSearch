var path = require('path');

module.exports = {
  entry: [
    './lib/src/app.js',
  ],
  output: {
    path: path.join(__dirname, './public/js/'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: { presets: ['react', 'es2015'],
        plugins: ['recharts']}
    }]
  }
};
