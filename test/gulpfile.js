'use strict';
var gulpMultiProcess = require('../index.js');
var gulp = require('gulp');

gulp.task('task1', function(cb) {

  console.log('-----task1----');
  setTimeout(function() {
    cb();
  }, 50);
});

gulp.task('task2', function(cb) {
  console.log('-----task2----');
  // console.log(process.stdout.write.toString());
  setTimeout(function() {
    cb();
  }, 50);
});

gulp.task('task3', function(cb) {
  console.log('-----task3----');
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
