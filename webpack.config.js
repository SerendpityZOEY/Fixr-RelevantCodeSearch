var CommonsChunkPlugin = require("./lib/CommonsChunkPlugin.js");

module.exports = {
  entry: [
    './demo/app.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
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
