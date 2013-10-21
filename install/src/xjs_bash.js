#!/usr/bin/env node

//load fs module
//process.chdir(__dirname);
console.log(process.cwd());

var fs 		= require('fs');
var fsextra = require('/etc/xjs/templates/project/lib/node_modules/fs-extra');

var args 	= process.argv;
var action	= args[2];
var resource= args[3];
var name	= args[4];
var path	= process.cwd();

var projectTemplate		= "/etc/xjs/templates/project/";
var controllerTemplate	= "/etc/xjs/templates/controller.js";
var modelTemplate		= "/etc/xjs/templates/model.js";

var capitalize = function(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
};

var fnGenerate = function(){
	
	var fnGenerateProject = function(){
		console.log("### Creating xjs project named "+ name +" ###");
		fs.mkdirSync(name);
		fsextra.copy(projectTemplate, path+"/"+name, function (err) {
			if (err) {
				console.error(err);
			} else {
				console.log("### Project "+ name +" created succesfully ###");
			}
		});
	};

	var fnGenerateController = function(){
		var sResourceName 		= capitalize(name)+"_controller.js";
		var sResourceClass 		= capitalize(name)+"Controller";
		var sResourceModelClass	= capitalize(name)+"Model";

		console.log("### Creating controller named "+ sResourceName +" ###");
		fsextra.copy(controllerTemplate, path + "/" + sResourceName, function (err) {
			if (err) {
				console.error(err);
			} else {

				fs.readFile(sResourceName, 'utf8', function (err,data) {
					if (err) {
						return console.log(err);
					}

					//	replace resource to name
					var result = data.replace(/resource/g, name);
					//	replace Controller to sResourceClass
					result = result.replace(/Controller/g, sResourceClass);
					//	replace Model to sResourceModelClass
					result = result.replace(/Model/g, sResourceModelClass);

					fs.writeFile(sResourceName, result, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				});
				console.log("### Controller "+ name +" created succesfully ###");

			}
		});	
	};

	var fnGenerateModel = function(){
		var sResourceName = capitalize(name)+"_model.js";
		var sResourceClass= capitalize(name)+"Model";

		console.log("### Creating model named "+ sResourceName +" ###");
		fsextra.copy(modelTemplate, path + "/" + sResourceName, function (err) {
			if (err) {
				console.error(err);
			} else {

				fs.readFile(sResourceName, 'utf8', function (err,data) {
					if (err) {
						return console.log(err);
					}

					//	replace Model to sResourceClass
					result = data.replace(/Model/g, sResourceClass);

					fs.writeFile(sResourceName, result, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				});
				console.log("### Model "+ name +" created succesfully ###");

			}
		});	
	};

	var fnGenerateScaffold = function(){
		var sModelResourceName 	= "app/_Model/"+capitalize(name)+"_model.js";
		var sModelResourceClass	= capitalize(name)+"Model";
		var sResourceModelClass	= capitalize(name)+"Model";

		console.log("### Creating model named "+ sModelResourceName +" ###");
		fsextra.copy(modelTemplate, path + "/" + sModelResourceName, function (err) {
			if (err) {
				console.error(err);
			} else {

				fs.readFile(sModelResourceName, 'utf8', function (err,data) {
					if (err) {
						return console.log(err);
					}

					//	replace Model to sModelResourceClass
					result = data.replace(/Model/g, sModelResourceClass);

					fs.writeFile(sModelResourceName, result, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				});
				console.log("### Model "+ name +" created succesfully ###");

			}
		});	

		//#################

		var sControllerResourceName = "app/_Controller/"+capitalize(name)+"_controller.js";
		var sControllerResourceClass= capitalize(name)+"Controller";

		console.log("### Creating controller named "+ sControllerResourceName +" ###");
		fsextra.copy(controllerTemplate, path + "/" + sControllerResourceName, function (err) {
			if (err) {
				console.error(err);
			} else {

				fs.readFile(sControllerResourceName, 'utf8', function (err,data) {
					if (err) {
						return console.log(err);
					}

					//	replace resource to name
					var result = data.replace(/resource/g, name);
					//	replace Controller to sControllerResourceClass
					result = result.replace(/Controller/g, sControllerResourceClass);
					//	replace Model to sResourceModelClass
					result = result.replace(/Model/g, sResourceModelClass);

					fs.writeFile(sControllerResourceName, result, 'utf8', function (err) {
						if (err) return console.log(err);
					});
				});
				console.log("### Controller "+ name +" created succesfully ###");

			}
		});	

	};

	if (action && resource && name){
		
		if (resource.toLowerCase() == 'project'){
			
			fnGenerateProject();

		} else if (resource.toLowerCase() == 'controller') {
			
			fnGenerateController();

		} else if (resource.toLowerCase() == 'model') {
			
			fnGenerateModel();

		} else if (resource.toLowerCase() == 'scaffold') {
			
			fnGenerateScaffold();

		}

	} else {
		console.log("Bad Command!!! ie: 'generate [resource] [name]'")
	}
};


if (action == 'generate'){
	fnGenerate();
}