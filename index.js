'use strict';

var spawn = require('child_process').spawn;

var gulpMultiProcess = function(tasks, cb) {
  var completed = 0;
  var code = 0;

  tasks.forEach(function(taskName) {
    var worker = spawn(process.execPath, [process.argv[1], taskName] , { stdio: 'inherit' });

    worker.on('exit', function (workerCode) {
      if(workerCode !== 0)  {
        code = workerCode;
      }

      completed++;

      if(completed === tasks.length) {
        cb(code);
      }
    });
  });
};

module.exports = gulpMultiProcess;
