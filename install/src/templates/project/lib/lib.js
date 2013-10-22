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
			var sModelName 				= sResourceName + "Model";

				if (sResourceName.charAt(0) !== "."){

				xjsConfig.resources.push(sResourceName);
				
				//	create an dinamic resource variable
				eval("var resource =  require(xjsConfig.CONTROLLER_FOLDER+'/"+ sResourceName +"_controller')."+ sResourceName +"Controller");
				
				// ###############################################################
				//							create REST
				// ###############################################################
				var sURL 		= "/" + sResourceName.toLowerCase();
				var sParamURL 	= "/" + sResourceName.toLowerCase() + "/:id";

				//	POST
				app.post(sURL, function (req, res) {
				    var product_data = req.body;
				    
				    eval("var product = new "+ sModelName +"(product_data)");

				    product.save(function (error, data) {
				        if (error) {
				            res.json(error);
				        } else {
				            console.log("Added New Product");
				            res.statusCode = 201;
				            res.send();
				        }
				    });
				});

				//	GET
				app.get(sURL, function (req, res) {
				    eval(sModelName+".find({}, function(error, data) {"+
				        "res.json(data);"+
				    "})");
				});

				app.get(sParamURL, function (req, res) {
				    eval(sModelName+".find({_id: req.params.id}, function(error, data) {"+
				        "res.json(data);"+
				    "})");
				});

				//	PUT
				app.put(sURL, function (req, res) {
				    eval(sModelName+".update("+
				        "{},"+
				        "{"+
				            "$set: req.body"+
				        "},"+
				        "{ multi: true },"+
				        "true"+
				    ")");
				    console.log("Updated Existing Product with ID: " + req.params.id);
				    res.send();        
				});

				app.put(sParamURL, function (req, res) {
				    eval(sModelName+".update("+
				        "{_id:req.params.id},"+
				        "{"+
				            "$set: req.body"+
				        "},"+
				        "false,"+
				        "true"+
				    ")");
				    console.log("Updated Existing Product with ID: " + req.params.id);
				    res.send();        
				});

				//	DELETE
				app.delete(sURL, function (req, res) {

						eval(sModelName+".find({}, function (error, products) {"+
						    "products.forEach(function (product) {"+
							    "product.remove();"+
							"});"+

						    "return res.send();"+
				    	"});");
				    
				});


				app.delete(sParamURL, function (req, res) {
					return (eval(sModelName+".findById(req.params.id, function (error, product) {"+
					        "return product.remove(function (error) {"+
					            "if (error) {"+
					                "console.log(error);"+
					            "} else {"+
					                "console.log('deleted product: ' + req.params.id);"+
					                "return res.send();"+
					            "}"+
					        "});"+
					    "});"));
				});

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
		

		//	If DB connection fail
		db.on('error', console.error.bind(
			console, 'DataBase connection error:')
		);

		//	If DB connection success
		db.once('open', function callback () {
			// yay!
			console.log("Database connected successful");

			// Loading Database Schemas
			models = fs.readdirSync(xjsConfig.MODEL_FOLDER);
	    	for (var model in models){

	    		var sModelFileName 	= models[model];
				var sResourceName	= sModelFileName.split("_model")[0];
				var ResourceSchema;

				if (sResourceName.charAt(0) !== "."){

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
		});
    };
};

exports.xjs = new XJS();
