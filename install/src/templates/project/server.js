projectFolder = __dirname+"/";

xjs 		= require(projectFolder + 'lib/lib').xjs;
xjsConfig 	= require(projectFolder + 'config/config').xjsconfig;

xjs.init();
/* 
################################################################################
#                   Start Server
################################################################################
*/

var logFile = fs.createWriteStream(xjsConfig.LOGS_SERVER, {flags: 'w'}); //use {flags: 'w'} to open in write mode
app.use(express.logger({stream: logFile}));

//	Init database
xjs.initDataBase();

//	simple logger
app.use(function(req, res, next){
	//	logger.httpReq(req);
  	next();
});

//	Middleware sponsor to map static files
app.use(express.static(xjsConfig.VIEW_FOLDER));

//	Add support to json, urlencoded and multipart
app.use(express.bodyParser());

//	Create listenner and url for all methods includes into controllers
xjs.createRestCalls();

server.listen(xjsConfig.SERVER_PORT, function(){
	//  Show a message of server started
    console.log("Server running at port: "+xjsConfig.SERVER_PORT+" ...");
});