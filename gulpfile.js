
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var md5 = require('gulp-md5-plus');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlreplace = require('gulp-html-replace');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevServer = require("webpack-dev-server");

// ============== compile =============
gulp.task('compile-less', function () {
  return gulp.src('src/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/styles'));
});

gulp.task('webpack', function(callback) {
  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
      colors: true
    }));
    callback();
  })
});

// ============== build =============
gulp.task('dest-images', function () {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('dest-fonts', function () {
  return gulp.src([
    'src/fonts/*',
  ]).pipe(gulp.dest('dist/fonts'));
});

gulp.task('dest-statics', function () {
  return gulp.src('src/statics/**/*')
    .pipe(gulp.dest('dist/statics'));
});

gulp.task('dest-html', function() {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', ['webpack'], function() {
  return gulp.src('src/scripts/app.js')
    .pipe(uglify())
    .pipe(md5(5,'dist/*.html'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('compress-css', ['compile-less'], function() {
  return gulp.src([
    'src/styles/app.css',
    'src/styles/weui.css',
    'src/styles/font-awesome.css'
  ])
    .pipe(cssnano())
    .pipe(md5(5,'dist/*.html'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig);

  new webpackDevServer(compiler, {
    // server and middleware options
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});

// ============== watch =============
gulp.task('watch', ['compile-less','webpack'], function() {
  gulp.watch(
    [
      'src/styles/**/*.less',
      'src/scripts/**/*.jsx',
      'src/scripts/js/*.js'
    ],
    [
      'compile-less',
      'webpack'
    ]
  )
});

gulp.task('build', [
  'dest-html',
  'dest-fonts',
  'dest-images',
  'dest-statics',
  'compress-css',
  'compress-js'
]);
