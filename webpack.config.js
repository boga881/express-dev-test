const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
    host: `localhost`,
  },
  entry: {
    app: [
      './src/js/index.js'
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      NODE_PATH: '/src'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/js/',
    filename: `[name].js`,
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, './src/js/actions/'),
      components: path.resolve(__dirname, './src/js/Components'),
      images: path.resolve(__dirname, './src/img'),
      reducers: path.resolve(__dirname, './src/js/reducers')
    }
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  'modules': 'false', //commonjs,amd,umd,systemjs,auto
                  'useBuiltIns': 'usage',
                  'targets': '> 0.25%, not dead',
                  'corejs': 3
                }
              ],
              [
                '@babel/react',
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
            ]
          }
        }]
      },
      {
        test: /\.css?/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      }
    ]
  }

};
