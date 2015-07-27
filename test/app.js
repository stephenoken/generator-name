var assert = require('assert');

describe('app init', function () {
  it('can be imported',function () {
    var app = require('../generators/app/index.js');
    var onePlusOne = 1+1
    assert.notEqual(app, undefined);
  });
});
