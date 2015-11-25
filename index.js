'use strict';

var spawn = require('child_process').spawn;

var gulpMultiProcess = function(tasks, cb) {
  var completed = 0;

  tasks.forEach(function(taskName) {
    var worker = spawn(process.argv[1], [taskName] , { stdio: 'inherit' });

    worker.on('exit', function (code) {
      completed++;

      if(completed === tasks.length) {
        cb();
      }
    });
  });
};

module.exports = gulpMultiProcess;
