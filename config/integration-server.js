/**
 * This is the server running in development
 */

const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.integration.js');

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(process.cwd(), './integration'),
  hot: true,
}).listen(3002, 'localhost', function (err, result) {
  if (err) { return console.log(err);
  }

  console.log('Listening at http://localhost:3002/');
});
