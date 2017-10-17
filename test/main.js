'use strict';
var exec = require('child_process').exec;
var path = require('path');
var chai = require('chai');
var expect = chai.expect;

describe('gulp-multi-process', function() {
  it('run 3 tasks in parallel', function(done) {
    exec('gulp multi --gulpfile ' + path.join(__dirname, 'gulpfile.js'), function (err, out) {
      expect(out).to.be.match(/Finished 'task1'/);
      expect(out).to.be.match(/Finished 'task2'/);
      expect(out).to.be.match(/Finished 'task3'/);
      expect(out).to.be.match(/Finished 'multi'/);
      done();
    });
  });

  it('takes into account cpus number', function (done) {
    exec('gulp multi-cpus --gulpfile ' + path.join(__dirname, 'gulpfile.js'), function (err, out) {
      expect(out).to.be.match(/Finished 'task1'/);
      expect(out).to.be.match(/Finished 'task2'/);
      expect(out).to.be.match(/Finished 'task3'/);
      expect(out).to.be.match(/Finished 'multi-cpus'/);
      done();
    });
  })
});
