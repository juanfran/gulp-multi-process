'use strict';
var gulpMultiProcess = require('../index.js');
var gulp = require('gulp');

function task1(done) {
  setTimeout(function() {
    done();
  }, 250);
}

exports.task1 = task1;

function task2(done) {
  setTimeout(function() {
    done();
  }, 250);
}

exports.task2 = task2;

function task3(done) {
  setTimeout(function() {
    done();
  }, 250);
}

exports.task3 = task3;

exports.single = gulp.series(task1 , task2, task3);

function multi(done) {
  return gulpMultiProcess(['task1', 'task2', 'task3'], done);
}

exports.multi = multi;

function multiCpus(done) {
  return gulpMultiProcess(['task1', 'task2', 'task3'], done, true);
}

exports.multiCpus = multiCpus;
