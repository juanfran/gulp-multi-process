'use strict';

const spawn = require('child_process').spawn;

const gulpMultiProcess = function(tasks, cb, cpusRespective) {
  var code = 0;

  const createWorker = function(onExit, taskName) {
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
    var completed = 0;
    let each = createWorker.bind(this, function (workerCode) {
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
    const cpusNumber = require('os').cpus().length;
    const queue = require('async/queue');
    let q = queue(function (taskName, callback) {
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

    q.drain(function () {
      cb(code);
    });
  }
};

module.exports = gulpMultiProcess;
