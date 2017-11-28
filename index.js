'use strict';

var spawn = require('child_process').spawn;

var gulpMultiProcess = function(tasks, cb, cpusRespective) {
  var code = 0;
  var completed;
  var each;
  var cpusNumber;
  var q;
  var createWorker = function(onExit, taskName) {
      var args = process.execArgv.concat([process.argv[1], taskName]);
      var worker;
      process.argv.forEach(function (val) {
        if(val[0] === '-' && val !== '--gulpfile') {
          args.push(val);
        }
      });
      worker = spawn(process.execPath, args , { stdio: 'inherit' });
      worker.on('exit', onExit);
  };

  if (!cpusRespective) {
    completed = 0;
    each = createWorker.bind(this, function (workerCode) {
      if(workerCode !== 0)  {
        code = workerCode;
      }
      completed++;
      if(completed === tasks.length) {
        cb(code);
      }
    });
    tasks.forEach(each);
  } else {
    cpusNumber = require('os').cpus().length;
    q = require('async.queue');
    q = q(function (taskName, callback) {
      createWorker(
        function (workerCode) {
          if(workerCode !== 0) {
            code = workerCode;
          }
          callback();
        },
        taskName
      );
    }, cpusNumber);
    tasks.forEach(function (task) {
      q.push(task)
    });

    q.drain = function () {
      cb(code);
    }
  }
};

module.exports = gulpMultiProcess;
