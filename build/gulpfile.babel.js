
process.chdir(process.env.ROOT_PATH)
console.log(`Working directory was changed to: ${process.cwd()}`)

import gulp from 'gulp'
import gutil from 'gulp-util'
import gulpSync from 'gulp-sync'
import del from 'del'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config.js'
import webpackWebConfig from './webpack.web.js'
import { default as jest } from 'gulp-jest'
import fs from 'fs'

const sync = gulpSync(gulp).sync

console.log('Started in ', process.env.NODE_ENV, ' mode')
/**
 * client:build
 *
 * Builds the client code from src/client to dist/client
 * Uses webpack to compile the code.
 */
gulp.task('mobile:build', (done) => {
  webpack(webpackConfig).run(x => done())
  gulp.src(`${process.env.CLIENT_PATH}/assets/favicon/*`)
    .pipe(gulp.dest(`${process.env.DIST_MOBILE_PATH}/favicon`))

  gulp.src( `${process.env.CLIENT_PATH}/assets/img/*`)
    .pipe(gulp.dest(`${process.env.DIST_MOBILE_PATH}/img`))
})

gulp.task('web:build', (done) => {
  webpack(webpackWebConfig).run(x => done())
  gulp.src(`${process.env.CLIENT_PATH}/assets/favicon/*`)
    .pipe(gulp.dest(`${process.env.DIST_WEB_PATH}/favicon`))

  gulp.src( `${process.env.CLIENT_PATH}/assets/img/*`)
    .pipe(gulp.dest(`${process.env.DIST_WEB_PATH}/img`))
})

gulp.task('clean', () => del([`${process.env.DIST_MOBILE_PATH}/*`, `${process.env.DIST_WEB_PATH}/*`]))

/* client:dev */
gulp.task('client:dev', () => {
  let compiler = webpack(webpackConfig)
  let server = new WebpackDevServer(compiler, webpackConfig.devServer)
  let port = webpackConfig.devServer.port
  let host = webpackConfig.devServer.host

  let fn = err => {
    if(err) throw new gutil.PluginError("webpack-dev-server", err)
    gutil.log("[webpack-dev-server]", "http://" + host + ":" + port)
  }

  server.listen(port, host, fn)
})

gulp.task('migration', (done) => {
  let migrate = require(`${process.env.SERVER_PATH}/syncer.js`)
  migrate(done)
})

gulp.task('tests:unit', () => {
   return gulp.src(`${process.env.TEST_UNIT_PATH}/*.js`).pipe(jest({
    config: {
      testRegex: process.env.JEST_TEST,
      testEnvironment: process.env.JEST_ENVIRONMENT,
      collectCoverage: ('true' == process.env.JEST_COVERAGE)
    }
  }))
})

gulp.task('tests:perf', done => {
  let files = fs.readdirSync(process.env.TEST_PERF_PATH)
  files.forEach(x => {
    if (x.indexOf('.js') === -1) {
      return
    }
    let suite = require(process.env.TEST_PERF_PATH + '/' + x)
    suite
      .on('error', x => {
        console.log('Benchmark encountered an error', x)
      })
      .on('start', x => {
        console.log('Started benchmark...')
      })
      .on('cycle', function(event) {
        console.log(String(event.target));
      })
      .on('complete', function () {
        // console.log('Fastest is ' + this.filter('fastest').map('name'))
        done()
      })
      .run({
        async: true
      })
  })
})

gulp.task('tests:all', ['tests:unit', 'tests:perf'])

gulp.task('task:new', (done) => {
  let newTask = require(`${process.env.SERVER_PATH}/newTask.js`)
  newTask.fn(done)
})


/* build */
gulp.task('start:production', sync(['clean', 'mobile:build', 'web:build']))
gulp.task('start:development', ['client:dev'])
gulp.task('start:test')
