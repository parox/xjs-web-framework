function Logger(){

    //  HttP request logger
    this.httpReq = function(req){
        var sLog = new Date() + "\t" + req.method + "\t" + req.url + "\n";
    	fs.appendFile(xjsConfig.LOGS_SERVER, sLog);
    };
    
};

exports.logger = new Logger();
