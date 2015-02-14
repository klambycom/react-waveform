var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

var paths = {
  example:  'example.html',
  main:     'example.js',
  js:       ['index.js', 'example.js'],
  dist:     'dist/'
};

gulp.task('copyexample', function () {
  return gulp.src(paths.example)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('browserify', function () {
  return gulp.src(paths.main)
    .pipe(browserify({ transform: 'reactify', debug: true }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function () {
  gulp.watch(paths.example, ['copyexample']);
  gulp.watch(paths.js, ['browserify']);
});

gulp.task('default', ['browserify', 'copyexample']);
