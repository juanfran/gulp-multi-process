'use strict';
var gulpMultiProcess = require('../index.js');
var gulp = require('gulp');

gulp.task('task1', function(cb) {
  setTimeout(function() {
    cb();
  }, 50);
});

gulp.task('task2', function(cb) {
  setTimeout(function() {
    cb();
  }, 50);
});

gulp.task('task3', function(cb) {
  setTimeout(function() {
    cb();
  }, 50);
});

gulp.task('multi', function(cb) {
  return gulpMultiProcess(['task1', 'task2', 'task3'], cb);
});

gulp.task('multi-cpus', function (cb) {
  return gulpMultiProcess(['task1', 'task2', 'task3'], cb, true);
});
