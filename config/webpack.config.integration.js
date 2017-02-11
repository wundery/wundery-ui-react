const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    './integration/index.js',
  ],

  output: {
    path: path.resolve(process.cwd(), 'dist/'),
    filename: 'bundle.js',
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['react-hot-loader', 'babel-loader'],
        include: [
          path.resolve(process.cwd(), 'src/'),
          path.resolve(process.cwd(), 'integration/'),
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      'node_modules',
    ],
    alias: {
      'components': path.resolve(process.cwd(), 'integration/components/'),
      'examples': path.resolve(process.cwd(), 'integration/examples/'),
      'utils': path.resolve(process.cwd(), 'integration/utils/'),
      'wundery-ui-react': path.resolve(process.cwd(), 'src/'),
    },
  },
};
