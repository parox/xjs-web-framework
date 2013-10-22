function XJS(){

    //  Inititialize all objects
    this.init = function(){
    	//	Load Express JS
    	express    	= require('express'),
		app        	= express(),
		//	Load FileSystem Module
    	fs 			= require('fs');
    	//	Logger
    	logger 		= require('./logger/logger').logger;
    	//	Model
    	Model 		= require('./model/model').model;
    	//	MongoDB
    	mongoose 	= require('mongoose');
    	//	Create resource list and map all methods
    	xjsConfig.resources = [];
    	
    };

    this.createRestCalls = function(){
    	console.log("Loading Rest configurations");
    	xjsConfig.urlMapping = {};
    	//	Request params
		app.param(function(name, fn){
			if (fn instanceof RegExp) {
				return function(req, res, next, val){
				  	var captures;
					if (captures = fn.exec(String(val))) {
				    	req.params[name] = captures;
				    	next();
					} else {
						next('route');
					}
				}
			}
		});

		controllers = fs.readdirSync(xjsConfig.CONTROLLER_FOLDER);
    	for (var controller in controllers){

    		var sControllerFileName 	= controllers[controller];
			var sResourceName			= sControllerFileName.split("_controller")[0];
			
				if (sResourceName.charAt(0) !== "."){

				xjsConfig.resources.push(sResourceName);
				
				//	create an dinamic resource variable
				eval("var resource =  require(xjsConfig.CONTROLLER_FOLDER+'/"+ sResourceName +"_controller')."+ sResourceName +"Controller");
				
				//	create map for each method on controller
				for (var method in resource){
					eval("var restMethod = resource['"+method+"'];");
					var aParams = this.getFunctionParams(restMethod);
					var sParams = "";
					var bRestGet = (method.charAt(0) == "_") ? false : true;

					method = method.replace("_","");

					//	Create params for map
					for (var param in aParams){
						if (bRestGet){
							sParams += "/:" + aParams[param] + "?";

							//	Create listenner for each param
							app.param(aParams[param], /^.+$/);
						}
					}

					//	Concat resource name with parameters on controller to create the mapping
					var sMap = "/" + sResourceName.toLowerCase() + "/" + method + sParams;
					if (method == "index"){
						var sMap = "/" + sResourceName.toLowerCase();
					}
					
					//	Add all urls for xjsConfig object
					xjsConfig.urlMapping["/" + sResourceName.toLowerCase() + "/" + method] = {
						callBack	: restMethod
					};
					
					//	Create the listenner and link to repective controller method	
					
					if (bRestGet){
						console.log("GET  -\t" + sMap);	

						app.get(sMap, function(req, res){
							var url = req.path;

							if (url.charAt(0) == "/"){
							    url = url.substr(1, url.length);
							} else {
							    url = url.substr(0, url.length);
							}

							var aUrl = url.split("/");

							url = "/" + aUrl[0] + "/" + aUrl[1];
							if (!aUrl[1]){
								url = "/" + aUrl[0] + "/index";
							}

							var oResp = xjs.treatControllerGetResponse(xjsConfig.urlMapping[url].callBack, req.params);

							if (oResp.model){
								console.log("Model");
								Model[oResp.action](req, res, oResp.model, oResp.params);
							} else {
								res.send(oResp);	
							}


						});
					} else {
						sMap = sMap.replace("_", "");
						console.log("POST -\t" + sMap);	
						app.post(sMap, function(req, res){
							var url = req.path;

							if (url.charAt(0) == "/"){
							    url = url.substr(1, url.length);
							} else {
							    url = url.substr(0, url.length);
							}

							var aUrl = url.split("/");

							url = "/" + aUrl[0] + "/" + aUrl[1];

							var oResp = xjs.treatControllerPostResponse(xjsConfig.urlMapping[url].callBack, req.body);

							if (oResp.model){
								console.log("Model");
								Model[oResp.action](req, res, oResp.model, oResp.params, oResp.object);
							} else {
								res.send(oResp);	
							}
						});
					}
				}	
    			console.log("Done!");
    		}
    	}
    };

    this.getFunctionParams = function(fn){
    	var args = /\(([^)]*)/.exec(fn.toString());

    	if (args){
    		if (args[1]) {
		    	args = args[1].split(/\s*,\s*/);
			} else {
			   args = [];
			}
    	} else {
    		args = [];
    	}
		
		return(args);
    };

    this.treatControllerPostResponse = function(callBack, req){
    	var response = {
    		success	: true,
    		data	: null,
    		date	: new Date()
    	};

    	var res = callBack(req);

    	if (res){
    		return res;	
    	} else {
    		return response;
    	}
    };

    this.treatControllerGetResponse = function(callBack, req){
    	var response = {
    		success	: true,
    		data	: null,
    		date	: new Date()
    	};

    	var sParams = "";
		for (var param in req){			
			if (!isNaN(req[param][0])){
				sParams += req[param][0] + ", ";	
			} else {
				sParams += "\"" + req[param][0] + "\", ";	
			}
		}

		sParams = sParams.substr(0, sParams.length-2);
    	eval("var res = callBack("+ sParams +")");

    	if (res){
    		return res;	
    	} else {
    		return response;
    	}
    };

    this.initDataBase = function(){
		mongoose.connect('mongodb://' + xjsConfig.DATABASES.default.HOST + '/' + xjsConfig.DATABASES.default.NAME);

		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'DataBase connection error:'));
		db.once('open', function callback () {
			// yay!
			console.log("Database connected successful");
		});

		console.log("Loading Database Schemas");
		models = fs.readdirSync(xjsConfig.MODEL_FOLDER);
    	for (var model in models){

    		var sModelFileName 	= models[model];
			var sResourceName	= sModelFileName.split("_model")[0];
			var ResourceSchema;

			if (sResourceName !== ".gitignore"){

				//	create an dinamic resource variable
				eval("var resource =  require(xjsConfig.MODEL_FOLDER+'/"+ sResourceName +"_model')."+ sResourceName +"Model");
				
				//	Add fields to model
				if (resource.fields){
					ResourceSchema = mongoose.Schema(resource.fields);
				}

				//	Add methods setted into models file to schema
				if (resource.methods){
					for (var property in resource.methods){
						eval("var attr = resource.methods['"+property+"'];");
						
						ResourceSchema.methods[property] = attr;
					}
				}

				var sModelName = sResourceName+"Model";
				eval(sModelName+" = mongoose.model('"+ sModelName +"', ResourceSchema);");

			}
		}
		console.log("Done!");
    };
};

exports.xjs = new XJS();
