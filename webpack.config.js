const path = require('path');

module.exports = {
  entry: './client/src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'client/bundle'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};