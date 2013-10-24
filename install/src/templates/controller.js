function Controller(){

	// POST /resource/create {name: 'foo'}
	this._post = function (resource){
		return ({
			model : Model		,
			action: 'create'	,
			params: resource	
		});
	};
	
	// GET /resource/read/01
	this.get = function (id){
		return ({
			model : Model		,
			action: 'findOne'	,
			params: {id: id}	
		});
	}
	
	// POST /resource/update {name: 'foo'}
	this.$event = function (resource){
		console.log("This is a websockets example");
	}
}

exports.Controller = new Controller();