'use strict';
const exec = require('child_process').exec;
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

describe('gulp-multi-process', function() {
  it('run 3 task in serie', function(done) {
    exec('gulp single --gulpfile ' + path.join(__dirname, 'gulpfile.js'), function (err, out) {

      if (err) {
        console.log(err);
      }
      expect(out).to.have.string("Finished 'task1"); // Finished 'task1'
      expect(out).to.have.string("Finished 'task2"); // Finished 'task2'
      expect(out).to.have.string("Finished 'task3"); // Finished 'task3'
      expect(out).to.have.string("Finished 'single");

      done();
    });
  });

  it('run 3 tasks in parallel', function(done) {
    exec('gulp multi --gulpfile ' + path.join(__dirname, 'gulpfile.js'), function (err, out) {

      if (err) {
        console.log(err);
      }
      expect(out).to.have.string("Finished 'task1"); // Finished 'task1'
      expect(out).to.have.string("Finished 'task2"); // Finished 'task2'
      expect(out).to.have.string("Finished 'task3"); // Finished 'task3'
      expect(out).to.have.string("Finished 'multi");

      done();
    });
  });

  it('takes into account cpus number', function (done) {
    exec('gulp multiCpus --gulpfile ' + path.join(__dirname, 'gulpfile.js'), function (err, out) {

      if (err) {
        console.log(err);
      }
      expect(out).to.have.string("Finished 'task1"); // Finished 'task1'
      expect(out).to.have.string("Finished 'task2"); // Finished 'task2'
      expect(out).to.have.string("Finished 'task3"); // Finished 'task3'
      expect(out).to.have.string("Finished 'multiCpus");

      done();
    });
  })
});
