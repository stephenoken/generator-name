var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  method1:function () {
    this.log(this.name);
    //Options
    this.option('coffee');
    this.scriptSuffix= (this.options.coffee? '.coffee':'.js');
    this.log(this.scriptSuffix);
  }
});
