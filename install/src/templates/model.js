function Model(){

	this.fields	= {
		name	: String
	};

	this.methods= {
		getName	: function () {
			return (this.name);
		}
	};
}

exports.Model = new Model();