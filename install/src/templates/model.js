function Model(){

	this.fields	= {
		id	: mongoose.Schema.Types.ObjectId
	};

	this.methods= {
		getId	: function () {
			return (this.id);
		}
	};
}

exports.Model = new Model();