const path = require('path');

module.exports = {
  devtool: false,
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'index': './src/index.ts',
    '2d/index': './src/2d/index.ts',
    '3d/index': './src/3d/index.ts',
    'utilities/index': './src/utilities/index.ts',
  },
  watchOptions: {
    aggregateTimeout: 500,
    ignored: [
      '**/node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    publicPath: '/build/',
    globalObject: 'this',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  externals: [],
  plugins: [],
};
