var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var open = require('open')

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(8080, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:8080');
    open('http://localhost:8080')
});
