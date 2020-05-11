# gulp-multi-process
[![Build Status](https://travis-ci.org/juanfran/gulp-multi-process.svg?branch=master)](https://travis-ci.org/juanfran/gulp-multi-process)
> Run gulp tasks in separate CPU processes


## Install

```shell
npm install gulp-multi-process --save-dev
```

## Usage

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

gulp.task('multi', function(cb) {
  // tasks will be spun up utilizing 1/2 of available cores
  return gulpMultiProcess(['task1', 'task2', 'task3', 'task4'], cb, 0.5);
});

gulp.task('multi', function(cb) {
  // tasks will be spun up utilizing all available cores
  return gulpMultiProcess(['task1', 'task2', 'task3', 'task4'], cb, 1.0);
});
```

### Warning

Run task in multiple processes is not always good for performance because spawn a different node processes is slow. It also depends on how long time it takes to require your `gulpfile`.
Keep in mind that you can pass a ratio (i.e `0.5`) as a third parameter to `gulpMultiProcess` fn in order to get optimal preformance. This will launch one process per core (adjusted by the ratio), and if there will be more of them than the number of usable cores on your machine it will put others into queue. When one process will finish its operation, the next one will be on launched.