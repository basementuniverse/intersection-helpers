const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
  devtool: false,
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.ts',
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
    libraryTarget: 'umd',
    publicPath: '/build/',
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    globalObject: 'this',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  externals: [],
  plugins: [
    new CleanWebpackPlugin(),
    new DtsBundleWebpack({
      name: '@basementuniverse/intersection-helpers',
      main: 'build/src/index.d.ts',
      baseDir: 'build',
      out: 'index.d.ts',
      removeSource: true,
      indent: '  ',
    }),
  ],
};
