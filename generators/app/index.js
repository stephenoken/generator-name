var generators = require('yeoman-generator');

var myBase = generators.Base.extend({
  helper:function () {
    console.log("helper: Not to be run");
  }
});

module.exports = myBase.extend({
  constructor:function () {
    generators.Base.apply(this,arguments);

    this.option('coffee');

    this.config.save();
  },
  //Makes this method a private
  __method1:function () {
    console.log('__method 1 just ran');
  },
  method2:function () {
    console.log('method 2 just ran');
    this.__method1();
  },
  //Define an instance function
  init: function () {
    this.helperMethod = function () {
      console.log("helperMethod: Not to be run");
    }
  },
  exec: function () {
    this.helperMethod();
    this.helper();
  }
});
