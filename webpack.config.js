const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MODULE_BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8081,
    host: `localhost`,
  },
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true&timeout=1000',
      './src/js/index.js'
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/js/',
    filename: `[name].js`,
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/js/actions/'),
      Components: path.resolve(__dirname, 'src/js/Components/'),
      keys: path.resolve(__dirname, 'src/keys/keys.js'),
      Reducers: path.resolve(__dirname, 'src/js/reduers/'),
      utilz: path.resolve(__dirname, 'src/js/utils/pwauth.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              [
                '@babel/preset-env',{
                  'modules': 'false',//commonjs,amd,umd,systemjs,auto
                  'useBuiltIns': 'usage',
                  'targets': '> 0.25%, not dead',
                  'corejs': 3
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
    ]
  },
  resolve: {
    alias: {}
  },
  plugins: [],

};
