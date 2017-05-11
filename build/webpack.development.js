import webpack from 'webpack'
import { Config } from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const envVars = {
  'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  'process.env.APP_TITLE': `"${process.env.APP_TITLE}"`,
  'process.env.ROOT_VIEW': `"${process.env.ROOT_VIEW}"`,
  'process.env.ROOT_ELEMENT_ID': `"${process.env.ROOT_ELEMENT_ID}"`,
  BASE_URL: `"${process.env.BASE_URL}"`,
  BASE_PATH: `"${process.env.BASE_PATH}"`
}

const exclude = /node_modules|framework7/
const f7Path = `${process.env.ROOT_PATH}/node_modules/framework7/dist`

const conf = new Config()
  .extend('./webpack.base.js')
  .merge({
    node: {
      fs: 'empty'
    },
    filename: __filename,
    debug: true,
    devtool: 'cheap-source-map',
    output: {
      path: process.env.DIST_MOBILE_PATH,
      pathinfo: true,
      publicPath: process.env.BASE_PATH
    },
    entry: {
      server: [
        `webpack-dev-server/client?http://${process.env.HOST_IP}:${process.env.HOST_PORT}`,
        'webpack/hot/dev-server'
      ],
      app: [
         `${process.env.CLIENT_PATH}/app`
      ],
      vendor: [
        'framework7'
      ]
    },

    resolve: {
      alias: {
        'lib': process.env.LIB_PATH,

        'controllers': `${process.env.CLIENT_PATH}/controllers`,
        'models': `${process.env.CLIENT_PATH}/models`,
        'views': `${process.env.CLIENT_PATH}/views`,

        'model': `${process.env.CLIENT_PATH}/model`,
        'db': `${process.env.CLIENT_PATH}/db`,
        'controller': `${process.env.CLIENT_PATH}/controller`,
        'view': `${process.env.CLIENT_PATH}/view`,

        'schema': `${process.env.SCHEMA_PATH}`,
        'data': `${process.env.DATA_PATH}`,

        'assets': `${process.env.CLIENT_PATH}/assets`,
        'css': `${process.env.CLIENT_PATH}/assets/css`,
        'fonts': `${process.env.CLIENT_PATH}/assets/fonts`,
        'js': `${process.env.CLIENT_PATH}/assets/js`,
        'images': `${process.env.CLIENT_PATH}/assets/images`,

        'framework7': `${f7Path}/js/framework7.js`,
        'framework7.ios.css': `${f7Path}/css/framework7.ios.css`,
        'framework7.ios.colors.css': `${f7Path}/css/framework7.ios.colors.css`,
        'framework7.material.css': `${f7Path}/css/framework7.material.css`,
        'framework7.material.colors.css': `${f7Path}/css/framework7.material.colors.css`
      },
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.css', '.tag', '.yml', '.yaml']
    },
    plugins: [
      new webpack.DefinePlugin(envVars),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new HtmlWebpackPlugin({
        inject: false,
        template: `${process.env.CLIENT_PATH}/assets/index.ejs`,
        mobile: true,
        baseHref: process.env.HOST_IP,
        appMountId: process.env.ROOT_ELEMENT_ID,
        devServer: process.env.NODE_ENV === 'development' ? `http://${process.env.HOST_IP}:${process.env.HOST_PORT}` : undefined,
        title: process.env.APP_TITLE,
        hash: true
      })
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: `${process.env.CLIENT_PATH}/assets`,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      port: process.env.HOST_PORT,
      host: process.env.HOST_IP,
    },
    module: {
      noParse: [
        /^framework7$/
      ],
      loaders: [
        { test: /\.js$/, exclude: exclude, loader: 'babel',
          query: {
            presets: ['es2015'],
            plugins: ['transform-pug-html']
          }
        }
      ]
    }
  })

module.exports = conf
