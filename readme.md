#Generator-name
This generator is simply a playground for me to try new things and also keep track of some of my observations.

##Function context
There are three ways to make functions a private method or a helper method.
* Prefix method name by an underscore
* Use instance methods:
* Extend a parent generator

##Run Loop
The run loop allows to make use of a list of functions in a non sequential order.

There are a list of priorities that can be used:
* `initializing` - Your initialization methods (checking current project state, getting configs, etc)
* `prompting` - Where you prompt users for options (where you'd call `this.prompt()`)
* configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
* `default`
* `writing` - Where you write the generator specific files (routes, controllers, etc)
* `conflicts` - Where conflicts are handled (used internally)
* `install` - Where installation are run (npm, bower)
* `end` - Called last, cleanup, say good bye, etc

##Arguments
Arguments are variables that passed straight in from the command line.
An argument has several options for it.
* `desc` Description for the argument
* `required` Boolean whether it is required
* `optional` Boolean whether it is optional
* `type` String, Number, Array, or Object
* `defaults` Default value for this argument
* `banner` String to show on usage notes (this one is provided by default)

##Options
Look like arguments, but written like command line flags.

##Dependencies controllers
Yeoman supplies methods that allow NPM and bower to install dependencies. It will also ensure that all dependencies are only called once.

##File Utilities
Yeoman uses a ejs like syntax in template files.
You can also use gulp to modify files as they are converted in Vinyl objects. 
And story continues...
