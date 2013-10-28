xjs-web-framework
=================

JavaScript Web Framework for web apps node based using MVC Patterns and sockets events


Why?
=================

Since Node.js makes possible run JavaScript server side, some thing changes, and the Node.js is every day becoming more popular.
There are very extensions for node, who makes web development easy, but this framework have the mission of inplements a standard in javascripts web apps, and makes javascript more popular.
Nowadays there are a lot of web framework that makes the web development easy, like Django, Rails, Zend, etc. 


Requirements
=================

  - Node.js
  - NPM
  - Mongo DB


Node Modules Dependêncies
=================

  - Express.js
  - Socket.io
  - MongoDB
  - Mongoose
  - FS-Extra


Installation
=================

run install.py in terminal:

    chmod +x install.py
    ./install.py


Architecture
=================

The xjs web framework is a command-line interface initially developed for linux. The tool has some commands that abble the developer to create projects and others resource.
The projects created by xjs have the following structure

    app
      _Controller
      _Model
      _View
    config
      config.js
    doc
      README
    lib
    log
      dev.log
      server.log
    tests
    server.js
      
XJS framework is a web framework written in javascript using node.js. Your mission is facilitate the web development process providing some utilities necessary actually.
This sctructure is created automatically running the command to create an app. All files and folders have a standards and will be explained in their respective session.
XJS framework joined some utilities, and it uses module like

  - Express.js
  - Socket.io
  - MongoDB
  - Mongoose
  - FS-Extra

If you want you can change the version but is necessary have known about linux structure.

Commands
=================

The xjs commands are very simple. The xjs commands is a simple tool to furnish the structure of create process.
The commands has a standard, xjs generate [resouce] [name]. 


The xjs MVC Standard
=================

The xjs framework work using MVC methodology. Into the project there is a folder called app. Into app folder there are tree foldres:

  - _Controller
  - _Model
  - _View


Project
=================

Create a project in xjs you just need to run the script bellow in terminal:

    xjs generate project HelloWorld

The script above will create a folder called HelloWorld that contains the minimum necessary to show an empty page of html5 Boilerplate.
The project create by default contains the structure defined in Architecture topic.


Scaffold
=================

Scaffold is an utilitary that create all resources in one command. The command is:

    xjs generate scaffold user

This command create controller, model and routes. In the future will be create tests too.


Controllers
=================

The controller in xjs is a simple javascript class. This class is used like a node.js module.
Whenever you want, you can create controller manually, since the class is on correct way.
There is a command too to create the controller.

    xjs generate controller user
    
This command create a controoler into the current folder you are. So for this works, you need to be on _Controller folder.
The controller created contains some default methods just to show an example of how to create REST and Events. The default methods are:

  - _post
  - get
  - $event

Each method make reference for one route, and the route is a REST. If the method starts with underscore (_), the REST is a POST REST, if not is a GET REST.
Above each method there is a comment saying what is the url for this method.
By default, xjs generate REST methods that can be access using two urls and diferents AJAX verbs. 
Getting the xjs command above, will be created a controller with these functions commented, and internally, will be created the following REST API.


|     Resource    |         POST          |         GET       |                PUT                |        DELETE          |
| --------------- |---------------------- | ----------------- | --------------------------------- | ---------------------- |
|     /user       |   Create a new user   |     List users    | Bulk update users                 |    Delete all users    |
|     /user/01    |         Error         |   list user id 1  | If exists update user if not error|    Delete user id 01         



Model
=================

The model is xjs is a javascript class that contais two parameters.

  - fields
  - methods

Like controllers, models can be created manually if you preffer, but there is a command for create this resource too:

    xjs generate model user

Like controller you must to be into _Models folder to run this.
Internally the Model uses the mongoose module. So the fields property is a json object and there are some type that is supported. bellow there is a simple example showing all types.

    this.fields = {
      id          : Objectid,
      name        : String,
      created     : Date,
      active      : Boolean,
      permissions : Array,
      salary      : Number
      //someOther : Buffer,
      //last      : Mixed,
    }

Above is showing a simple example, if you have known about mongoose, you can create a more complex model. 
The other attribute is an object that contains some functions properties. Each property make a method into the model, for example:

    this.methods= {
      getName	: function () {
        return (this.name);
      }
    };


View
=================

Views are simple static files. The xjs framework works with W3C standards, and when you create a project, is generated into _View folder a structure based on HTML5Boilerplate.
In Other words, you can create layouts without care about the other things. In projects that there is a webdesigner, he can create the layout and html,css, images, etc, and when he finish just copyt ho _View folder.


Config file
=================

Config file contains info of the project. The only thing that is necessary to change are:

  - DATABASES - name, host
  - SERVER_PORT - by default the server run in 8080 port
