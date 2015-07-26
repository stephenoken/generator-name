var generators = require('yeoman-generator');
var _ = require('lodash');

var myBase = generators.Base.extend({
  // helper:function () {
  //   console.log("helper: Not to be run");
  // }
});

module.exports = myBase.extend({
  constructor:function () {
    generators.Base.apply(this,arguments);

    //arguments
    //makes 'appname' a requirement
    this.argument('appname',{
      type: String,
      required: true
    });
    this.appname = _.camelCase(this.appname);

    this.option('coffee');

    this.config.save();
  },
  //Makes this method a private
  _method1:function () {
    // console.log('__method 1 just ran');
  },
  method2:function () {
    // console.log('method 2 just ran');
    // this._method1();
  },
  //Define an instance function
  init: function () {
    // this.helperMethod = function () {
    //   console.log("helperMethod: Not to be run");
    // }
  },
  exec: function () {
    // this.helperMethod();
    // this.helper();
  },
  //Prompts
  prompting: function () {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname //Defaults to curent directory name
    }, function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  },

  // prompting: function () {
  //   var done = this.async();
  //   this.prompt({
  //     type: 'input',
  //     name: 'username',
  //     message: 'What\'s your github username',
  //     store: true
  //   },function (answers) {
  //     this.log(answers.username);
  //     done();
  //   }.bind(this));
  // }

  //Installing dependencies
  _installAllDependencies:function () {
    // this.npmInstall(['lodash'],{
    //   'saveDev': true
    // });
    // this.bowerInstall(['angularjs','jquery'],{
    //   'save': true
    // });
    //Works by calling npm && bower install. This means we need to populate the respective package files
    this.installDependencies();

  },

  //Paths
  paths:function () {
    // this.log(this.sourceRoot());
    // this.log(this.templatePath("index.js"));
  },

  writing: function () {
    // var beautify = require('gulp-beautify');
    // this.registerTransformStream(beautify({indentSize:2}));
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/view/index.html'),
      {
        title: 'Templating Yeoman',
        name: this.appname
      }
    );
    this.fs.copy(
      this.templatePath('gulp/**/*.js'),
      this.destinationPath()
    );
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath()
    );
    this._installAllDependencies();
  }
});
