function Controller(){

	// POST /resource/create {name: 'foo'}
	this._create = function (resource){
		return ({
			model : Model		,
			action: 'create'	,
			params: resource	
		});
	};
	
	// GET /resource/read/01
	this.read = function (id){
		return ({
			model : Model		,
			action: 'findOne'	,
			params: {id: id}	
		});
	}
	
	// POST /resource/update {name: 'foo'}
	this._update = function (resource){
		return ({
			model : Model		,
			action: 'update'	,
			params: user 		,
			object: {name: resource.name}
		});
	}
	
	// POST /resource/delete
	this._delete = function (resource){
		return ({
			model : Model		,
			action: 'remove'	,
			params: resource	
		});
	}

	// GET /resource
	this.index = function (){
		return ({
			model : Model		,
			action: 'find'		,
			params: {}	
		});
	}
}

exports.Controller = new Controller();