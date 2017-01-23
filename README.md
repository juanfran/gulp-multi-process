#gulp-multi-process
[![Build Status](https://travis-ci.org/juanfran/gulp-multi-process.svg)](https://travis-ci.org/juanfran/gulp-multi-process)
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
```

### Warning

Run task in multiple processes is not always good for performance because spawn a different node processes is slow. It also depends on how long time it takes to require your `gulpfile`.
