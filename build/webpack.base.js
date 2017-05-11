import path from 'path'
import text from 'extract-text-webpack-plugin'
import { Config } from 'webpack-config'
import webpack from 'webpack'

const exclude = /node_modules/

module.exports = new Config().merge({
  output: {
    filename: '[name].js'
  },
  resolve: {
    root: [
      process.env.CLIENT_PATH
    ],
    modulesDirectories: [
      'node_modules'
    ]
  },
  plugins: [
    new text('[name].css')
  ],
  module: {
    preLoaders: [
      { test: /\.yml|\.yaml$/, exclude: exclude, loaders:
        [
          'json-loader',
          'yaml-loader',
          'string-replace?' + JSON.stringify({
            search: '\\$\\{FIREBASE_NAMESPACE\\}',
            replace: process.env.FIREBASE_NAMESPACE,
            flags: 'g'
          })
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=5000' },
      { test: /\.css$/, exclude: /node_modules(?!\/framework7)|global\.css/, loader: "style-loader!css-loader!postcss-loader" },
      { test: /\.jpg$/, exclude: exclude, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.gif$/, exclude: exclude, loader: 'url-loader?prefix=img/&limit=5000' },
      { test: /\.woff/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.woff2/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.eot/, loader: 'file-loader?prefix=font/' },
      { test: /\.ttf/, loader: 'file-loader?prefix=font/' },
      { test: /\.svg/, loader: 'file-loader?prefix=font/' },
      { test: /\.html$/, loader: 'html', query: { minimize: true } }
    ]
  },
  postcss: function (webpack) {
    return [
      require('postcss-strip-inline-comments'),
      require('postcss-color-function'),
      require('postcss-mixins'),
      require('postcss-smart-import'),
      require('autoprefixer'),
      require('precss')
    ];
  }
})
