import path from 'path'

export default {
  entry: path.join(__dirname, '/client/index.js'),
  output: {
    path: path.join(__dirname, '/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /(node_modules|bower_components)/,
        loader: [ 'babel-loader' ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js' ]
  }
}
