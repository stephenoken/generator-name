var generators = require('yeoman-generator');

module.exports = generators.NamedBase.extend({
  method1:function () {
    this.log(this.name);
  }
});
