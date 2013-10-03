function Model(){

    this.findOne = function(req, res, model, params){
    	console.log("findOne");
		model.findOne(params, function (err, fetched) {
			if(err) {console.log(err)}
			res.send(fetched);
		});
    };

    this.find = function(req, res, model, params){
    	console.log("find");
		model.find(params, function(error, data) {
	        res.json(data);
	    });
    };

    this.create = function(req, res, model, params){
    	console.log("create");
		model.create(params, function (err) {
			if (err) {
                console.log(err);
	            res.json(err);
			} 
			// saved!
			res.send(params);
		})
    };

    this.remove = function(req, res, model, params){
    	console.log("remove");
    	model.findById(params._id, function (err, target) {
	        return target.remove(function (err) {
	            if (err) {
	                console.log(err);
	            	res.json(err);
	            } else {
	                console.log("Deleted");
	                return res.send();
	            }
	        });
	    });
	    console.log("removed");
    } ;

    this.update = function(req, res, model, id, object){
    	console.log("update");
    	model.update(
	        {_id: id._id},
	        {
	        	$set: object
	        },
	        false,
	        true
	    );
	    console.log("Updated");
	    res.send();
    }
};

exports.model = new Model();
