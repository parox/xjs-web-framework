function Model(){

	this.fields	= {
		id		: ObjectId,
		name	: String
	};

	this.methods= {
		getId	: function () {
			return (this.id);
		}
	};
}

exports.Model = new Model();