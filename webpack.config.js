const path = require('path');

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
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/js/',
        filename: `[name].js`,
    },
    resolve: {
     alias: {
       Components: path.resolve(__dirname, 'src/js/Components/')
     }
   },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                      {
                        'modules': 'false',//commonjs,amd,umd,systemjs,auto
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
            }
          ]
        }
      ]
    },
    resolve: {
        alias: {}
    },
    plugins: [],

};
