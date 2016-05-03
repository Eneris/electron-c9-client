var gulp = require('gulp');
var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');
var clean = require('gulp-clean');
var zip = require('gulp-vinyl-zip');

var electronVersion = '0.37.8'

gulp.task('default', ['build:win']);
gulp.task('build', ['clean', 'build:win', 'build:linux']);

gulp.task('clean', function() {
  return gulp.src('build', {read: false}).pipe(clean());
});

gulp.task('build:win', function () {
  return gulp.src('src/**')
  .pipe(electron({
    version: electronVersion,
    platform: 'win32',
    arch: 'x64',
    winIcon: 'assets/icon.ico'
  }))
  .pipe(symdest('build/win32-x64'))
  .pipe(zip.dest('build/win32-x64.zip'));
});

gulp.task('build:darwin', function () {
  return gulp.src('src/**')
  .pipe(electron({
    version: electronVersion,
    platform: 'darwin',
    arch: 'x64',
    darwinIcon: 'assets/icon.icns'
  }))
  .pipe(symdest('build/darwin-x64'))
  .pipe(zip.dest('build/darwin-x64.zip'));
});

gulp.task('build:linux', function () {
  return gulp.src('src/**')
  .pipe(electron({
    version: electronVersion,
    platform: 'linux',
    arch: 'x64'
  }))
  .pipe(symdest('build/linux-x64'))
  .pipe(zip.dest('build/linux-x64.zip'));
});