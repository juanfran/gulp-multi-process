# gulp-multi-process
[![Build Status](https://travis-ci.org/juanfran/gulp-multi-process.svg?branch=master)](https://travis-ci.org/juanfran/gulp-multi-process)
> Run gulp tasks in separate CPU processes


## Install

```shell
npm install gulp-multi-process --save-dev
```

## Usage

### Gulp 3
`gulpfile.js`
```js
var gulp = require('gulp');
var gulpMultiProcess = require('gulp-multi-process');

gulp.task('task1', function(cb) {
  // example
});

gulp.task('task2', function(cb) {
  // example
});

gulp.task('multi', function(cb) {
  // task1 and task2 will run in different processes
  return gulpMultiProcess(['task1', 'task2'], cb);
});
```
### Gulp 4
`gulpfile.js`
```js
const gulp = require('gulp');
const gulpMultiProcess = require('gulp-multi-process');

function task1() {
  // example
});

exports.task1 = task1;

function task2() {
  // example
});

exports.task2 = task2;

// gulp single will run task1 and task2 on a serial way
exports.single = gulp.series(task1, task2)

function multi(done) {
  // task1 and task2 will run in different processes
  return gulpMultiProcess(['task1', 'task2'], done);
}

exports.multi = multi;
```

### Warning

Run task in multiple processes is not always good for performance because spawn a different node processes is slow. It also depends on how long time it takes to require your `gulpfile`.
Keep in mind that you can pass `true` as a third parameter to `gulpMultiProcess` fn in order to get optimal performance. This will launch one process per core, and if there will be more of them than the number of cores on your machine it will put others into queue. When one process will finish its operation, the next one will be on launched.
