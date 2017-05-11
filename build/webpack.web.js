import webpack from 'webpack'
import { Config } from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = new Config()
  .extend({
    './webpack.development.js': function(config) {
      delete config.debug
      delete config.devtool
      delete config.output.pathinfo
      delete config.devServer
      delete config.entry.server
      return config;
    }
  })
  .merge({
    filename: __filename,
    output: {
      path: process.env.DIST_WEB_PATH
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: `${process.env.CLIENT_PATH}/assets/web.ejs`,
        mobile: true,
        baseHref: process.env.HOST_IP,
        appMountId: process.env.ROOT_ELEMENT_ID,
        title: process.env.APP_TITLE,
        hash: true
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      })
    ]
  })
