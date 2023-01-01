const { series, parallel, src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const delelet = require('delete');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglifycss = require('gulp-uglifycss');

function clean(cb) {
  delelet(['public/dist/'], cb);
}

function css() {
  return src(
    [
      'public/node_modules/bootstrap/dist/css/bootstrap.min.css',
      'public/assets/css/custom.css',
      'public/assets/css/responsive.css'
    ],
    { sourcemaps: true }
  )
    .pipe(autoprefixer())
    .pipe(concat('all.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(
      uglifycss({
        uglyComments: true
      })
    )
    .pipe(rename({ extname: '.min.css', basename: 'app' }))
    .pipe(dest('public/dist/'));
}

function javascript() {
  return src(
    [
      'public/node_modules/angular/angular.min.js',
      'public/assets/js/app.js',
      'public/assets/js/mainController.js',
      'public/assets/js/mainService.js',
      'public/node_modules/jquery/dist/jquery.min.js',
      'public/node_modules/bootstrap/dist/js/bootstrap.min.js'
    ],
    { sourcemaps: true }
  )
    .pipe(concat('all.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js', basename: 'app' }))
    .pipe(dest('public/dist/'));
}

exports.default = series(clean, parallel(css, javascript));
