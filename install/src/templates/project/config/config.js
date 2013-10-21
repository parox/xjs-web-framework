function CONFIG(){
    return ({
        PROJECT_FOLDER      : __dirname.replace("config",""),
        MODEL_FOLDER        : __dirname.replace("config","") + "app/_Model",
        VIEW_FOLDER         : __dirname.replace("config","") + "app/_View",
        CONTROLLER_FOLDER   : __dirname.replace("config","") + "app/_Controller",

        ADMINS      : {
            //'Admin': 'admin@admin.com'
        },
        
        SERVER_PORT : 8080,

        LOGS_DEV    : __dirname.replace("config","") + "log/dev.log",
        LOGS_SERVER : __dirname.replace("config","") + "log/server.log",
        
        VIEW_TYPES  : 'js|css|property|json|jpg|bmp|jpeg|png', // except htmls
        
        DATABASES   : {
            'default'   : {
                'ENGINE'    : 'mongo'       ,
                'NAME'      : 'test'        ,
                //'USER'      : 'root'        ,
                //'PASSWORD'  : '12345'       ,
                'HOST'      : 'localhost'   ,
                //'PORT'      : '3306'        
            }
        },
        
        SECURITY : 'User'
    });
};
exports.xjsconfig = new CONFIG();