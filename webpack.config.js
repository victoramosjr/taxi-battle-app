const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './frontend/entryRouter.js',
  output: {
    path: `${__dirname}/frontend/public`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['es2015', 'react', 'stage-1'] } 
      }, 
      { test: /\.scss$/, 
        use: ['style-loader', 'css-loader', 'sass-loader']  
      }
     ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    enforceExtension:false
  },
  plugins: [ new LiveReloadPlugin() ]
}
